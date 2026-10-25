/* =========================================================================
   FOND ANIMÉ : colonnes de code qui défilent (C# Unity, C++ Unreal, Python bpy)
   + une ligne tapée en direct avec un curseur.

   Performance :
   - chaque colonne est dessinée UNE fois dans un canvas hors écran,
     puis simplement recopiée (drawImage) avec un décalage à chaque frame ;
   - 30 images/s maximum, pause quand l'onglet est caché ;
   - image fixe si l'utilisateur a demandé moins d'animations (prefers-reduced-motion).
   Les couleurs viennent du CSS (--code-*) et suivent le thème jour / nuit.
   ========================================================================= */
(function () {
  "use strict";

  const SNIPPETS = [
`// PlayerController.cs
public class PlayerController : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 6f;
    [SerializeField] private float jumpForce = 12f;
    [SerializeField] private float coyoteTime = 0.12f;
    private Rigidbody2D rb;
    private float coyoteTimer;

    void Awake() => rb = GetComponent<Rigidbody2D>();

    void Update()
    {
        float x = Input.GetAxisRaw("Horizontal");
        rb.velocity = new Vector2(x * moveSpeed, rb.velocity.y);
        coyoteTimer = IsGrounded() ? coyoteTime : coyoteTimer - Time.deltaTime;
        if (Input.GetButtonDown("Jump") && coyoteTimer > 0f)
            rb.velocity = new Vector2(rb.velocity.x, jumpForce);
    }
}`,
`// ObjectPool.cs
public class ObjectPool<T> where T : Component
{
    private readonly Queue<T> pool = new Queue<T>();
    private readonly T prefab;

    public T Get()
    {
        T item = pool.Count > 0 ? pool.Dequeue() : Object.Instantiate(prefab);
        item.gameObject.SetActive(true);
        return item;
    }

    public void Release(T item)
    {
        item.gameObject.SetActive(false);
        pool.Enqueue(item);
    }
}`,
`// EnemyAI.cs - state machine
private enum State { Patrol, Chase, Attack }
private State state = State.Patrol;

void Tick()
{
    float dist = Vector3.Distance(transform.position, target.position);
    switch (state)
    {
        case State.Patrol: if (dist < 10f) state = State.Chase; break;
        case State.Chase:  agent.SetDestination(target.position);
                           if (dist < 2f) state = State.Attack; break;
        case State.Attack: if (dist > 3f) state = State.Chase; break;
    }
}`,
`// HealthComponent.h
UCLASS(ClassGroup=(Custom), meta=(BlueprintSpawnableComponent))
class MYGAME_API UHealthComponent : public UActorComponent
{
    GENERATED_BODY()
public:
    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category="Health")
    float MaxHealth = 100.f;

    UFUNCTION(BlueprintCallable, Category="Health")
    void ApplyDamage(float Amount);

    UPROPERTY(BlueprintAssignable)
    FOnDeath OnDeath;
private:
    float CurrentHealth = 0.f;
};`,
`// HealthComponent.cpp
void UHealthComponent::ApplyDamage(float Amount)
{
    if (Amount <= 0.f || CurrentHealth <= 0.f) return;
    CurrentHealth = FMath::Clamp(CurrentHealth - Amount, 0.f, MaxHealth);
    if (CurrentHealth == 0.f)
    {
        OnDeath.Broadcast(GetOwner());
    }
}`,
`// MyCharacter.cpp
void AMyCharacter::SetupPlayerInputComponent(UInputComponent* Input)
{
    Super::SetupPlayerInputComponent(Input);
    auto* EIC = CastChecked<UEnhancedInputComponent>(Input);
    EIC->BindAction(MoveAction, ETriggerEvent::Triggered, this, &AMyCharacter::Move);
    EIC->BindAction(JumpAction, ETriggerEvent::Started, this, &ACharacter::Jump);
}`,
`# batch_export.py - Blender addon
import bpy

class EXPORT_OT_batch_fbx(bpy.types.Operator):
    bl_idname = "export.batch_fbx"
    bl_label = "Batch export FBX"

    def execute(self, context):
        for obj in context.selected_objects:
            bpy.ops.object.select_all(action="DESELECT")
            obj.select_set(True)
            path = bpy.path.abspath(f"//export/{obj.name}.fbx")
            bpy.ops.export_scene.fbx(filepath=path, use_selection=True,
                                     axis_forward="-Z", axis_up="Y")
        return {"FINISHED"}`,
`// SpatialHash.cs
public void Insert(Entity e)
{
    int cx = Mathf.FloorToInt(e.Position.x / cellSize);
    int cy = Mathf.FloorToInt(e.Position.y / cellSize);
    int key = cx * 73856093 ^ cy * 19349663;
    if (!cells.TryGetValue(key, out var list))
        cells[key] = list = new List<Entity>(8);
    list.Add(e);
}`,
`// GameLoop.cs
const float FixedStep = 1f / 60f;
float accumulator;

void Frame(float dt)
{
    accumulator += Mathf.Min(dt, 0.25f);
    while (accumulator >= FixedStep)
    {
        Simulate(FixedStep);
        accumulator -= FixedStep;
    }
    Render(accumulator / FixedStep);
}`
  ];

  const TYPED = [
    "git commit -m \"feat: coyote time + jump buffer\"",
    "dotnet build -c Release",
    "Debug.Log($\"FPS: {1f / Time.unscaledDeltaTime:F0}\");",
    "UE_LOG(LogTemp, Warning, TEXT(\"Hello Unreal\"));",
    "git push origin main",
    "bpy.ops.export_scene.gltf(filepath=out, export_format=\"GLB\")",
    "// TODO: polish the game feel",
    "return isGrounded || coyoteTimer > 0f;"
  ];

  const KEYWORDS = new Set(("public private protected class struct enum void float int bool var new return if else " +
    "for foreach while switch case break const readonly static override virtual using namespace where out in " +
    "auto this true false null nullptr def import from self and or not None True False with as").split(" "));

  /* ---------------- Canvas ---------------- */
  const canvas = document.createElement("canvas");
  canvas.id = "bg";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");
  const root = document.documentElement;
  const reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  const FONT_SIZE = 13, LINE_H = 20, COL_W = 420, PAD = 28;
  let W = 0, H = 0, dpr = 1, columns = [], colors = {}, typer = null;

  function readColors() {
    const cs = getComputedStyle(root);
    const v = (n, fb) => (cs.getPropertyValue(n).trim() || fb);
    colors = {
      base: v("--code-base", "rgba(139,147,167,.22)"),
      kw: v("--code-kw", "rgba(94,240,181,.32)"),
      type: v("--code-type", "rgba(106,168,255,.30)"),
      str: v("--code-str", "rgba(255,184,77,.30)"),
      com: v("--code-com", "rgba(139,147,167,.14)"),
      num: v("--code-num", "rgba(255,93,115,.30)"),
      cursor: v("--accent", "#5ef0b5")
    };
  }

  // Découpe une ligne en morceaux colorés (coloration syntaxique minimaliste)
  function tokenize(line) {
    const out = [];
    const ci = line.search(/\/\/|#(?!include)/);
    let code = line, comment = "";
    if (ci >= 0 && !/["'][^"']*$/.test(line.slice(0, ci))) { code = line.slice(0, ci); comment = line.slice(ci); }
    const re = /("[^"]*"|'[^']*'|\$"[^"]*")|(\b\d+(?:\.\d+)?f?\b)|([A-Za-z_]\w*)|(\s+)|(.)/g;
    let m;
    while ((m = re.exec(code))) {
      if (m[1]) out.push([m[1], "str"]);
      else if (m[2]) out.push([m[2], "num"]);
      else if (m[3]) out.push([m[3], KEYWORDS.has(m[3]) ? "kw" : /^[A-Z]/.test(m[3]) ? "type" : "base"]);
      else out.push([m[0], "base"]);
    }
    if (comment) out.push([comment, "com"]);
    return out;
  }

  function shuffled(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }

  // Pré-rend une colonne entière dans un canvas hors écran
  function buildColumn() {
    const lines = [];
    shuffled(SNIPPETS).forEach((s) => { lines.push(...s.split("\n"), "", ""); });
    const h = lines.length * LINE_H;
    const off = document.createElement("canvas");
    off.width = Math.ceil(COL_W * dpr); off.height = Math.ceil(h * dpr);
    const o = off.getContext("2d");
    o.scale(dpr, dpr);
    o.font = `${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;
    o.textBaseline = "top";
    const charW = o.measureText("M").width;
    lines.forEach((line, i) => {
      let x = 0;
      for (const [txt, kind] of tokenize(line)) {
        if (x > COL_W) break;
        o.fillStyle = colors[kind];
        o.fillText(txt, x, i * LINE_H);
        x += txt.length * charW;
      }
    });
    return { canvas: off, h, lines };
  }

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    readColors();
    const n = Math.max(1, Math.ceil((W + PAD) / (COL_W + PAD)));
    columns = [];
    for (let i = 0; i < n; i++) {
      const col = buildColumn();
      col.x = i * (COL_W + PAD) - (n * (COL_W + PAD) - W) / 2;
      col.speed = 9 + Math.random() * 14;      // px/s : chaque colonne a sa vitesse (parallaxe)
      col.y = Math.random() * col.h;
      columns.push(col);
    }
    newTyper();
  }

  /* ---------------- Ligne tapée en direct ---------------- */
  function newTyper() {
    typer = {
      text: "> " + TYPED[(Math.random() * TYPED.length) | 0],
      x: 24 + Math.random() * Math.max(10, W - 520),
      y: 80 + Math.random() * Math.max(10, H - 160),
      t: 0, hold: 0, fade: 1
    };
  }
  function drawTyper(dt) {
    if (!typer) return;
    const speed = 22; // caractères par seconde
    const shown = Math.min(typer.text.length, Math.floor(typer.t * speed));
    typer.t += dt;
    if (shown >= typer.text.length) { typer.hold += dt; if (typer.hold > 2.2) typer.fade -= dt * 1.5; }
    if (typer.fade <= 0) { newTyper(); return; }
    ctx.globalAlpha = Math.max(0, typer.fade) * 0.85;
    ctx.font = `600 ${FONT_SIZE + 1}px "JetBrains Mono", ui-monospace, monospace`;
    ctx.textBaseline = "top";
    ctx.fillStyle = colors.cursor;
    const txt = typer.text.slice(0, shown);
    ctx.fillText(txt, typer.x, typer.y);
    if (Math.floor(performance.now() / 500) % 2 === 0 || shown < typer.text.length) {
      const w = ctx.measureText(txt).width;
      ctx.fillRect(typer.x + w + 2, typer.y, 8, FONT_SIZE + 3);
    }
    ctx.globalAlpha = 1;
  }

  /* ---------------- Boucle ---------------- */
  function draw(dt) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    for (const c of columns) {
      c.y = (c.y + c.speed * dt) % c.h;
      // le code monte : on recopie la colonne deux fois pour boucler sans couture
      const top = -c.y;
      for (let y = top; y < H; y += c.h) ctx.drawImage(c.canvas, c.x, y, COL_W, c.h);
    }
    drawTyper(dt);
  }

  let last = performance.now(), acc = 0, running = true;
  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.1, (now - last) / 1000); last = now; acc += dt;
    if (acc >= 1 / 30) { draw(acc); acc = 0; }  // 30 images/s suffisent pour un fond
    requestAnimationFrame(frame);
  }

  build();
  if (reduced) draw(0);
  else requestAnimationFrame(frame);

  document.addEventListener("visibilitychange", () => {
    if (reduced) return;
    running = !document.hidden;
    if (running) { last = performance.now(); requestAnimationFrame(frame); }
  });
  let rt = 0;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { build(); if (reduced) draw(0); }, 150); });
  // changement de thème -> on redessine les colonnes avec les nouvelles couleurs
  new MutationObserver(() => { build(); if (reduced) draw(0); }).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  // la police JetBrains Mono peut arriver après le premier rendu
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { build(); if (reduced) draw(0); });
})();
