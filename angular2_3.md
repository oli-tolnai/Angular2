# Angular2 3.hét 3.óra

## TANANYAG: [Viewchild](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/viewchild)

**Folytatjuk azt a témát ahol azt nézzük át, hogyan tudnak komponensek kommunikálni, és adatokat átadni egymás között**

![angular2_3_1_uj.png](https://github.com/oli-tolnai/Angular2/blob/main/kepek/angular2_3_1_uj.png)

**1.) I/O komponens** <br>
Előző órán tanultuk az `I/O`-t a komponenseknél. Ahol például az `@Input` használatánál a szülő komponens csak annyit tud, hogy van  egy változó a gyermek komponensben aminek át tud adni értéket. Tehát az A komponens ad valamit a B komponensnek, de az A nem tudja hogy a B mit fog azzal csinálni, és a B komponens sem tudja hogy az A komponens mire való és mit csinál.

![angular2_3_InputOutput](https://github.com/oli-tolnai/Angular2/blob/main/kepek/angular2_3_InputOutput.png)

**2.) viewchild** <br>
Másik módszer a `viewchild` használata. Itt a szülő komponens teljes rálátást kap a gyermek komponensre.  
Teháát az A komponens teljes mértékben eléri a B-t (körülölei)

![`angular2_3_viewchild`](https://github.com/oli-tolnai/Angular2/blob/main/kepek/angular2_3_viewchild.png)

Ennek bemutatásához készítünk egy card komponenst, amit `"template"`-ként tudunk majd használni.

<br>

`ts card.component.ts:`
```ts card.component.ts
export class CardComponent {

  message: string = "Lorem ipsum dolor sit amet"
  secret: string = "valami titkos üzenet"

  changeMessage(): void {
    this.message = "**NEW CONTENT**"
  }
}
```
<br>

`html card.component.html:`
```html card.component.html
<p>{{message}}</p>  
```

>Létrehoztuk a card komponenst, ami kiír egy üzenetet ami a `message` változóban van. A `secret` változót csak azért hoztuk létre, hogy lássuk, hogy a szülő komponenst azt is eléri majd. Emellett egy `changeMessage()` metódust is csináltunk ami megváltoztatja az üzenet tartalmát  
---
<br>

> Alábbi példakód a **template reference** változók és a **@ViewChild dekorátor** használatát mutatja be, amelyek lehetővé teszik a szülő komponens és gyermek komponens közötti közvetlen kommunikációt.


`ts app.component.ts:`
```ts app.component.ts
export class AppComponent {
  
  @ViewChild("card") cardComp !: CardComponent

  update(): void {
    console.log(this.cardComp.secret)
    this.cardComp.changeMessage()
  }
```
>A TypeScript fájlban a `@ViewChild("card")` dekorátor egy hivatkozást hoz létre a gyermek komponens példányára. A dekorátor paraméterként a `"card"` stringet kapja, ami megfelel a HTML sablonban definiált `#card` template reference változónak. A `cardComp` tulajdonság fogja tárolni a tényleges `CardComponent` példány hivatkozását, miután az Angular inicializálta azt.

>Az `update()` metódus bemutatja a közvetlen szülő-gyermek kommunikációt azáltal, hogy hozzáfér a gyermek komponens tulajdonságaihoz és metódusaihoz. Kiírja a gyermek komponens `secret `tulajdonságát a konzolra, és meghívja a gyermek `changeMessage()`metódusát. Ez demonstrálja, hogy a `@ViewChild` hogyan teszi lehetővé a szülő számára, hogy programozottan interakcióba lépjen a gyermek komponenssel.

<br>

`html app.component.html:`
```html app.component.html
<h1>App component</h1>

<button (click)="update()">Update</button>

<app-card #card></app-card>
```

>A HTML sablonban a `<app-card #card></app-card>` elem létrehozza a gyermek komponenst és hozzárendeli a `#card` template reference változót. Ez a referencia változó az, ami összeköti a gyermek komponens példányát a TypeScript kódban lévő `@ViewChild` dekorátorral. A gomb click eseménye az update() metódushoz van kötve, így interaktív módon lehet kiváltani a szülő-gyermek kommunikációt.

 

**Kérdés**: <br>
*Melyiket érdemes használni? Az `I/O` vagy a `viewchild` a jobb?* <br>
Összességében ha lehet, inkább `I/O`-t használjunk, ugyanis az átláthatóbb, és professzionálisabb. A `viewchild` használata során könnyebben alakulhat ki káosz.








## TANANYAG: [Content-projection](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/content-projection)

**Content-projection** egy harmadik mód lesz a komponensek közötti kommunikációra, az eddig tanult I/O és viewchild-on kívül. <br>
Ennek az a lényege, hogy pl a `card` komponensen belül van egy olyan hogy `ng-content`, ami azért speciális mert van benne egy selector, ami abba a komponensbe fog föl referálni ahol meghívjuk ezt a komponenst, tehát a példánkban most az app komponsensbe.

_Azért ez a neve, mert a tartalom fönt van definiálva és az bele van projektálva a lentebbi részbe_

A **Content-projection** sablon építésre lesz jó, és a fókusz most főleg a `html`-en és a `css`-en lesz.

<br>

`card.component.html:`
```html card.component.html
<div>
    <h1><ng-content select="[title]"></ng-content></h1>
    <h5><ng-content select="[year]"></ng-content></h5>
    <p><ng-content select="[intro]"></ng-content></p>
</div>
```

> A `ng-content` egy speciális Angular direktíva, amely lehetővé teszi a tartalom beillesztését egy komponens sablonjába. Ez a direktíva helyőrzőként működik, amelybe a szülő komponensből származó tartalom kerül beillesztésre. A `select` attribútum segítségével meghatározhatjuk, hogy mely elemek kerüljenek beillesztésre az adott helyőrzőbe.


<br>

`card.component.sass:`
```css card.component.sass
div
    width: 300px
    border: 5px solid red
    border-radius: 10px
    padding: 10px 30px
    margin: 0 auto
    margin-bottom: 5px
    text-align: center
```

> A `card.component.sass` fájlban a stílusokat definiáljuk a card komponens számára. A `div` elemre vonatkozó stílusok meghatározzák a szélességet, a keretet, a lekerekített sarkokat, a belső és külső margókat, valamint a szöveg igazítását. A `margin: 0 auto` középre igazítja a komponenst vízszintesen, emellett minden margint felülír, ezért külön meg kell adni a `margin-bottom` értékét is.

---


Csinálunk egy movie osztályt is:
<br>

`movie.ts:`
```ts movie.ts
export class Movie {
    title: string = ""
    year: number = 0
    intro: string = ""

    constructor(title: string = "", year: number = 0, intro: string = "") {
        this.title = title
        this.year = year
        this.intro = intro
    }
}
```

> Ez egy egyszerű TypeScript osztály, amely egy filmet reprezentál három tulajdonsággal: `title`, `year` és `intro`. 


<br>

`app.component.ts:`
```ts app.component.ts
export class AppComponent implements OnInit {
  movies: Movie[] = []

  ngOnInit(): void {
    this.movies.push(
      new Movie("The Matrix", 1999, "Lorem ipsum dolor sit amet..."),
      new Movie("Inception", 2010, "Lorem ipsumamet..."),
      new Movie("Interstellar", 2014, "Lorem ipsum dolor sit ipsum dolor sit ipsum dolor sit amet..."),
      new Movie("The Dark Knight", 2008, "Lorem ipsum dolor ..."),
    )
  }
}
```

> Egy `movies` nevű tömböt hozunk létre, ami `Movie` objektumokat tartalmaz. Az `ngOnInit()` életciklus metódusban feltöltjük a tömböt néhány példányosított `Movie` objektummal. `ngOnInit()` helyett konstruktort is használhatnánk.

<br>
A card komponenst beillesztjük az app komponensbe:

`app.component.html:`
```html app.component.html
<app-card *ngFor="let item of movies">
  <div title>
    <u>
      <i>
        {{ item.title }}
      </i>
    </u>
    <span *ngIf="item.year > 2010" style="background-color: aqua;">*</span>
  </div>
  <div year>{{item.year}}</div>
  <div intro>{{item.intro}}</div>
</app-card>
```

> Itt a `*ngFor` direktívával iterálunk a `movies` tömb elemein, és minden egyes filmhez létrehozunk egy `app-card` komponenst. A `div` elemekben a `title`, `year`, és `intro` attribútumokat használjuk, hogy a megfelelő tartalmat átadjuk a `card` komponensnek a `ng-content` segítségével. Az `*ngIf` direktíva pedig feltételesen jelenít meg egy csillagot, ha a film éve nagyobb, mint 2010.


> Content-projection fontos része még, hogy nem csak egyszerűen tudunk átadni dolgokat hanem tudunk extrázni, pl a title-nél meg tudjuk azt csinálni. hogy nem csak nyersen a tartalmat adhatjuk át, hanem stílust is, mert mindent át ad ami a selectoros div-en belül van.
Tehát a div-en belül ha még adunk neki félkövéret, dölt stílust stb. akkor azok is mind átkerülnek.
<br> **Teljes html kódokat bele lehet projektálni nem csak a tartalmat.**








## TANANYAG: templateRef és viewcontainerRef
Ezt a két dolgot nem tanuljuk részletesebben, de igény szerint utána lehet nénzi.

A **TemplateRef** egy Angular template (sablon) hivatkozását jelenti - gyakorlatilag egy tervrajzot, amiből nézetek (view-k) hozhatók létre. Ez egy beágyazott sablon, ami többször példányosítható különböző view példányok létrehozására.

A **ViewContainerRef** ezzel szemben egy tárolót jelent, ahol egy vagy több nézet csatolható. Gondolhatunk rá úgy, mint egy helyfoglalóra a DOM-ban, ahová az Angular dinamikusan beszúrhat, eltávolíthat vagy manipulálhat nézeteket.

> Mind a TemplateRef, mind a ViewContainerRef a **@ViewChild dekorátort** használja a háttérben. Ez logikus, mivel a @ViewChild az Angular elsődleges mechanizmusa arra, hogy hivatkozásokat kapjunk template elemekre, komponensekre vagy direktívákra. Amikor dinamikusan szeretnénk manipulálni sablonokat vagy tárolókat, általában először @ViewChild segítségével kell rájuk hivatkozást szereznünk.








## TANANYAG: [Életciklusok `lifecycle`](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/lifecycles)

> Az életciklusok azok a pontok egy komponens életében, amikor az Angular értesíti a komponenst, hogy valami fontos dolog történt vele. Ezeket úgy kell elképzelni, mint eseményeket vagy állapotváltozásokat, amelyek során a komponens különböző metódusokat hív meg.

**Az életciklusokat és a hozzájuk tartozó metódusokat interfészeken keresztül tudjok elérni.**


Eddig mikor seed adatokat akartunk létrehozni akkor konstruktort használtunk, de sokkal jobb helyük van az `ngOnInit()`-ben. 

Az alábbi honlapon megtalálhatóak milyen életciklusok vannak: [angular lifecycle](https://angular.dev/guide/components/lifecycle).
Azonban itt van a magyarra lefordított változat is: 

# Lifecycle hooks

| **Fázis** | **Metódus neve** | **Mikor fut le** | **Tipikus Példa** |
| --- | --- | --- | --- |
| **Creation** | `constructor` | Lefut, amikor Angular példányosítja a komponenst.  | Szolgáltatás injektálása, property-k alapértékre állítása.    |
| **Change Detection** | `ngOnInit`   | Egyszer fut le, miután az összes input inicializálva lett.   | Kezdeti adatbetöltés, API-hívás indítása, form alapállapotának felépítése, egyszeri inicializálás.    |
|  | `ngOnChanges` | Minden alkalommal lefut, amikor egy `@Input` értéke megváltozik (az első beállításkor is). | Input alapján belső állapot frissítése (pl. számított mező kiszámítása, log transform).   |
|  | `ngDoCheck`  | Minden change detection ciklusban lefut.   | Saját, optimalizált változásdetektáló logika írása (pl. nagy listák diffelése, teljesítmény-optimalizáció).  |
|  | `ngAfterContentInit`  | Egyszer fut, miután a projectált tartalom (`<ng-content>`) inicializálva lett.| Ellenőrzés, hogy a kötelező projected content tényleg bekerült-e (pl. slot-validáció).   |
|  | `ngAfterContentChecked` | Minden content change detection után lefut.  | Projectált tartalom figyelése, amikor belső logikát kell futtatni content-változáskor.   |
|  | `ngAfterViewInit`    | Egyszer fut, miután a komponens nézete és a gyerek komponensek nézete inicializálódott.  | DOM-méretek lekérése, 3rd-party UI lib inicializálása, `@ViewChild` komponens meghívása.  |
|  | `ngAfterViewChecked`  | Minden view change detection után lefut.   | Layout finomhangolása, animáció elindítása a DOM végleges állapota után. (Óvatosan használni, nehogy végtelen ciklust okozzon!) |
| **Rendering**    | `afterNextRender`    | Egyszer fut, amikor a teljes DOM render befejeződött. | Egyedi mérés vagy animáció, amihez a teljes oldalt készen kell látni (pl. scroll pozíció beállítása).|
|  | `afterEveryRender`   | Minden DOM render után lefut.    | Globális UI-szinkron (pl. sticky header pozíció frissítése minden render után).  |
| **Destruction**   | `ngOnDestroy` | Egyszer fut, mielőtt a komponens megsemmisül. | Subscribek leiratása, interval/timeouts leállítása, DOM események leválasztása.  |

_Az `ngOnInit`-et lehetne a creationbe is rakni, de a changedetectionbe van._

Az alábbi képen azt is láthatjuk hogy milyen sorrendben futnak le:
![lifecycle sorrend](https://github.com/oli-tolnai/Angular2/blob/main/kepek/angular2_3_lifecycle-hooks.png)


*Alapvetően a constructor nem egy hook mint a többi.*


---
### Most megnézünk párat, amiket fontos tudni.

Ehhez 3 komponenst készítünk: A, B és child és még egy stringContent classt is.

> *Fontos most megemlíteni, de később majd részletezzük hogy a lifecycle-ben, hogy az ngFor-nak más a viselkedése, hogy ha objektumon hívjuk meg mintha csak egy primitív típuson hívnánk meg. Éppen ezért mi most készíteni fogunk egy `string-content` osztályt*

<br>

`string-content.ts:`
```ts string-content.ts
export class StringContent {
    content: string = ""
    constructor(content: string = "") {
        this.content = content
    }
}
```

<br>

app-routingba megyünk és beállítjuk a routingot hogy az A és B komponens között tudjunk váltani

`app-routing.module.ts:`
```ts app-routing.module.ts
const routes: Routes = [
  { path: "compa", component: ComponentAComponent },
  { path: "compb", component: ComponentBComponent },
];
```

<br>

app-component html-be megyünk, létrehozunk kettő gombot ami routerlinkes és beszúrjuk a router-outletet


`app.component.html:`
```html app.component.html
<h1>Main app component</h1>
<hr>
<button routerLink="compa">Component A</button>
<button routerLink="compb">Component B</button>
<hr>
<router-outlet></router-outlet>
```

<br>

### Ezután elkészítjük az A komponest

`component-a.component.ts:`
```ts component-a.component.ts
export class ComponentAComponent implements OnInit, OnDestroy {
  constructor() {
    console.log("Comp A constructor runs")
  }

  ngOnDestroy(): void {
    console.log("Comp A OnDestroy runs")
  }
  
  ngOnInit(): void {
    console.log("Comp A OnInit runs")
  }
}
```

> Itt az `OnInit` és `OnDestroy` interfészeket implementáljuk, hogy használhassuk az `ngOnInit()` és `ngOnDestroy()` életciklus metódusokat. A konstruktorban, valamint az `ngOnInit()` és `ngOnDestroy()` metódusokban konzol üzeneteket írunk ki, hogy lássuk, mikor futnak le ezek a metódusok a komponens életciklusa során.

<br>

`component-a.component.html:`
```html component-a.component.html
<div>
    <h4>Component A</h4>
</div>
```

---
### Elkészítjük a B komponenst is:
`component-b.component.ts:`
```ts component-b.component.ts
export class ComponentBComponent {
  contents: StringContent[] = []
  message: string = "This is my welcome message"

  constructor() {
    console.log("Component B constructor runs")
    this.contents.push(new StringContent("Lorem ipsum"))
    this.contents.push(new StringContent("Dolor sit"))
    this.contents.push(new StringContent("Amet ipsum dolor"))
  }

  changeItem(): void {
    this.message = this.message.replace("welcome", "goodbye")
  }
}
```

> Itt a `ComponentBComponent` osztályban egy `contents` nevű tömböt hozunk létre, ami `StringContent` objektumokat tartalmaz. A konstruktorban feltöltjük ezt a tömböt néhány példányosított `StringContent` objektummal, és egy `message` változót is definiálunk, ami egy üzenetet tárol. Emellett van egy `changeItem()` metódusunk, ami megváltoztatja az üzenet tartalmát.

<br>

`component-b.component.html:`
```html component-b.component.html
<div>
    <h4>Component B</h4>
    <button (click)="changeItem()">Change message</button>
    <app-child *ngFor="let item of contents"
        [content]="item"
        [message]="message"
    ></app-child>
</div>
```

> A HTML sablonban egy gombot hozunk létre, ami a `changeItem()` metódust hívja meg kattintásra. Emellett egy `ngFor` direktívát használunk, hogy iteráljunk a `contents` tömb elemein, és minden egyes elemhez létrehozunk egy `app-child` komponenst. Az `app-child` komponensnek átadjuk a `content` és `message` változókat inputként.

---

### Végül elkészítjük a child komponenst is:

`child.component.ts:`
```ts child.component.ts
export class ChildComponent implements OnChanges {
  @Input() content: StringContent = new StringContent()
  @Input() message: string = ""

  constructor() {
    console.log("Child constructor runs")
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Child OnChanges runs")
  }
}
```

> Itt a `ChildComponent` osztályban két `@Input` dekorátorral ellátott változót definiálunk: `content`, ami egy `StringContent` objektum, és `message`, ami egy string. A konstruktorban és az `ngOnChanges()` metódusban konzol üzeneteket írunk ki, hogy lássuk, mikor futnak le ezek a metódusok a komponens életciklusa során. Az `ngOnChanges()` metódus akkor fut le, amikor bármelyik input változó értéke megváltozik.

<br>

`child.component.html:`
```html child.component.html
<div>
    <h4>{{ message }}</h4>
    <p>{{ content.content }}</p>
</div>
```

<br>

**Összefoglalva a projekt működése:**
- Az app komponensben két gomb van, amik az A és B komponensek között váltanak.
- Az A komponens csak egy egyszerű üzenetet jelenít meg, és az életciklus metódusokat használja, hogy lássuk mikor jön létre és mikor semmisül meg.
- A B komponens egy gombot és egy listát jelenít meg, ahol a listában child komponensek vannak.
- A child komponens két inputot kap a B komponenstől: egy `StringContent` objektumot és egy üzenetet.
- A child komponens az `OnChanges` életciklus metódust használja, hogy lássuk mikor változnak meg az inputok.


**Érdekesség**, hogy ha `ngfor`-ral rakosgassuk ki az elemeket és primitív típussal dolgozunk, akkor az ngfor a gyerek kmoponenst kiveszi (eltünteti) azaz lefut a ondestroy is és újra lerakja és lefut a constructor, onchanges és oninit is újra a gyerek komponensben. Azonban ha objektumon hívjuk meg akkor csak az onchanges és oninit fut le újra, a constructor és ondestroy nem. Ez azért van mert az ngfor látja hogy ugyanaz az objektum így nem veszi ki a gyerek komponenst csak frissíti az értékét. Ezért csináltuk meg a stringcontent osztályt. Primitív típusnál ez nem így van mert az egy érték típus és az ngfor nem látja hogy ugyanaz az érték így kiveszi és újra beteszi a gyerek komponenst.



### Servicek életciklusa
Eddig csak a komponensek életciklusáról beszéltünk és a service-kről még nem beszéltünk nem is véletlen. A service-knek egyszerű az életciklusuk.

A servicek alapvetően `singleton`-ként jönnek létre. Tehát mindig ugyanazt az egy példányt kapjuk vissza. Ha van egy service-em és 8 komponens használja akkor nem jön létre újra és újra a service. *Ez átállítható hogy ne singleton legyen de az ritka, hogy ilyen kelljen nekünk.*

A servicek először akkor jönnek létre, ahol/amior dependecy injectionnal megkapja egy komponenens.<br>
Így ezekután nem nagyon beszélhetünk életciklusokról.


A servicek életciklusát az IOC konténerek kezelik.<br>
`IOC` = `inversion of control` 
<br>
Ez azt jelenti hogy a servicek életciklusát nem mi kezeljük hanem az IOC konténer. Az IOC konténer egy olyan hely ahol a servicek létre jönnek és megsemmisülnek. Az IOC konténer feladata hogy létrehozza a serviceket és megsemmisítse őket amikor már nincs rájuk szükség.





## TANANYAG: [Authetication - simple token](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/auth-login-simple-token)


Backenden olyan volt ez, hogy voltak api végpontok és voltak ahol voltak lakatok, amit csak bejelentkezett felhasználk tudták használni.
<br>Frontend küld pl egy login api hívást, a backend leellenőrzte, hogy beléphet e, ha igen akkor visszaküld egy tokent (pl jwt).

A feladatunk az tehát hogy a frontend megkapja a tokent, és azt el kell tárolnunk és utána tudjuk meghívni a többi api-t, amihez már kell a token.

![authentication](https://github.com/oli-tolnai/Angular2/blob/main/kepek/angular2_3_3auth_uj.png)

A projektünkhoz fog kelleni egy login és logout komponens (utóbbi elhagyható) és kell még demoCompA és demoCompB komponensek. És persze az app component is kell.

<br>

### *A lépések be vannak számozva. Ezek mentén haladj, ha olvasod a jegyzetet.*


**2.)** A username és password-ot valahol tárolnunk is kell, ezért csinálunk egy loginModel osztályt, amiben tároljuk ezt a két változót.
És ezt a loginModelt példányosítani tudjuk a login komponensben és utána NgModellel összekötjük, és a gombnyomásra átadjuk a service-nek a loginmodel példányunkat.


`login.model.ts:`
```ts login.model.ts
export class LoginModel {
    username: string = ""
    password: string = ""
}
```

<br>

>**LoginModel**: Ez az osztály a bejelentkezési adatokat tárolja, nevezetesen a felhasználónevet és a jelszót.

---

<br>

`login.component.ts:`
```ts login.component.ts
export class LoginComponent {
  loginModel: LoginModel = new LoginModel()
  
  constructor(public authService: AuthService) { }

  inputCheck(): boolean {
    return !(this.loginModel.username.length > 3 && this.loginModel.password.length > 3)
  }
}
```


<br>

`login.component.html:`
```html login.component.html
<input type="text" placeholder="username" [(ngModel)]="loginModel.username">
<input type="password" placeholder="password" [(ngModel)]="loginModel.password">
<button (click)="authService.login(loginModel)" [disabled]="inputCheck()">Login</button>
```

<br>

> **LoginComponent**: Ez a komponens kezeli a felhasználói bejelentkezést. Tartalmaz egy `loginModel` objektumot, amely a felhasználó által megadott felhasználónevet és jelszót tárolja. A `inputCheck()` metódus ellenőrzi, hogy a felhasználónév és jelszó legalább 4 karakter hosszú-e, és ennek megfelelően engedélyezi vagy tiltja a bejelentkezés gombot. A bejelentkezési folyamatot az `AuthService` `login()` metódusa végzi.

---

<br>

**6.)** Most megnézzük a logout. Annyira gyorsan lefut hogy fölösleges egy komponens, de a itt csinálunk több dolgot, pl megnézi nincs e folyamatba valami és felugrik egy ablak hogy biztos ki akarsz a lépni. Logout igazából csak egyetlen metódus hívás ezért fölösleges külön komponenes neki.
Ez a logout lényegében annyi hogy auth service-ben egy metódussal kitöröljük a locastorage-ben eltárolt tokent


`logout.component.ts:`
```ts logout.component.ts
export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router) {
    authService.logout()
    this.router.navigate(["login"])
  }
}
```

<br>

>**LogoutComponent**: Ez a komponens kezeli a felhasználói kijelentkezést. A komponens konstruktorában meghívja az `AuthService` `logout()` metódusát, amely eltávolítja a hitelesítési tokent a helyi tárolóból, majd átirányítja a felhasználót a bejelentkezési oldalra.


---

<br>

`demo-comp-a.component.html:`
```html demo-comp-a.component.html
<div>
    <h1>Demo Component -A-</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate ab perspiciatis soluta magnam sequi odit adipisci voluptas possimus nihil! Blanditiis neque earum porro voluptates. Neque quaerat quia assumenda dolore ipsam?</p>
    <p>Lorem ipsum dolor sit.</p>
</div>
```

<br>

>**DemoCompAComponent**: Ez egy egyszerű bemutató komponens, amely statikus tartalmat jelenít meg. Nincs benne speciális logika vagy interakció.

---

<br>

`demo-comp-b.component.ts:`
```ts demo-comp-b.component.ts
export class DemoCompBComponent {
  jobId: string = ""
  constructor(private http: HttpClient) { }
  deleteJob(): void {

    const token = JSON.parse(localStorage.getItem(environment.tokenKey)!).token

    const headers = new HttpHeaders()
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")

    this.http.delete(`${environment.apis.job}`, {
      headers,
      body: { id: this.jobId }
    }).subscribe(x => {
      console.log(x)
    })
  }
}
```

<br>

`demo-comp-b.component.html:`
```html demo-comp-b.component.html
<div>
    <h1>Demo Component -B-</h1>
    <p>f5e6d7c8-1234-5678-9101-1121-314151617181</p>
    <input type="text" [(ngModel)]="jobId" placeholder="job's id">
    <button (click)="deleteJob()">Delete job</button>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, culpa at? Mollitia cupiditate, deserunt expedita a, provident dolorem suscipit dolorum quia eligendi libero cum cumque ipsum quo! Minus, voluptatem cum.</p>
</div>
```

<br>

>**DemoCompBComponent**: Ez a komponens egy bemutató funkciót valósít meg, amely lehetővé teszi a felhasználó számára, hogy egy adott azonosító alapján töröljön egy munkát. A komponens tartalmaz egy `jobId` változót, amely a felhasználó által megadott azonosítót tárolja. A `deleteJob()` metódus lekéri a hitelesítési tokent a helyi tárolóból, majd egy HTTP DELETE kérést küld az API-nak a megadott azonosítóval.


---

<br>

`app-routing.module.ts:`
```ts app-routing.module.ts
const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "compa", component: DemoCompAComponent },
  { path: "compb", component: DemoCompBComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent }, 
  { path: "logout", component: LogoutComponent },
  { path: "**", redirectTo: "login", pathMatch: "full" }
];
```

<br>

>**AppRoutingModule**: Ez a modul kezeli az alkalmazás útvonalait. Meghatározza, hogy melyik komponens melyik útvonalhoz tartozik, és beállítja az útvonalvédelmet a `DemoCompBComponent` számára az `AuthGuard` segítségével, amely biztosítja, hogy csak hitelesített felhasználók férhessenek hozzá ehhez a komponenshez.

---

<br>

`app.component.html:`
```html app.component.html
<h1>Login demo</h1>

<hr>

<ul>
  <li *ngIf="!authService.isLoggedIn(); else logOutSection"><a routerLink="login">Login</a></li>
  <ng-template #logOutSection>
    <li><a routerLink="logout">Logout</a></li>
  </ng-template>
  <li><a routerLink="compa">Component A</a></li>
  <li><a routerLink="compb">Component B</a></li>
</ul>

<hr>

<router-outlet></router-outlet>
```

<br>

`app.component.ts:`
```ts app.component.ts
export class AppComponent {
  constructor(public authService: AuthService) { }
}
```

<br>

>**AppComponent**: Ez a fő alkalmazás komponens, amely tartalmazza a navigációs menüt és a router outlet-et. A menüben feltételesen jeleníti meg a bejelentkezési vagy kijelentkezési linket az `AuthService` `isLoggedIn()` metódusa alapján.

---

<br>

`auth.token.ts:`
```ts auth.token.ts
export class AuthToken {
}
```

<br>

>**AuthToken**: Ez egy egyszerű osztály, amely a hitelesítési tokent reprezentálja. Jelenleg nincs benne mező, de később bővíthető a tokennel kapcsolatos információkkal.

---

<br>

**10.)** Végül pedig a routing védelmét nézzük meg. Ezt a routing modulban tudjuk megtenni a canActivate-vel. Itt most egy egyszerű logikát használunk, hogy megnézzük van e token a localstorage-ben és ha van akkor engedélyezzük a routingot. Ez egy egyszerűbb megoldás, de lehetne bonyolultabb is pl ellenőrizhetnénk a tokent hogy lejárt e stb.


`auth.guard.ts`
```ts auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const value = localStorage.getItem(environment.tokenKey)
  if (!value) return false
  return value.length > 10
};
```

<br>

>**AuthGuard**: Ez egy útvonalvédelmi őr, amely megakadályozza, hogy nem hitelesített felhasználók hozzáférjenek bizonyos útvonalakhoz. A `canActivate` metódus ellenőrzi, hogy van-e érvényes hitelesítési token a helyi tárolóban.

---



<br>

**5.)** csinálunk environmentset is amibe kirakjuk az apit ha már tanultunk ilyet. A tokent is kirakjuk ide egy környezeti változóba.

`environment.development.ts`
```ts environment.development.ts
export const environment = {
    apis: {
        login: "https://api.siposm.hu/login",
        developer: "https://api.siposm.hu/getDevelopers",
        job: "https://api.siposm.hu/job",
    },
    tokenKey: "my-custom-token-key"
};
```

<br>

>**Environment Configuration**: Ez a konfigurációs fájl tartalmazza az API végpontokat és a hitelesítési token kulcsát, amelyet a helyi tárolóban használnak. 


---

<br>

**1.)** Csinálunk egy külön servicet-t ahhoz hogy kezeljük a bejelentkezést: login metódus. És ezt a metódust meghívjuk a login kompononsben.

**3.)** A következő lépés a backend meghívása. amihez az api.siposm-et használjuk. A service-ben most lekódoljuk a login methódust. És a megkapott tokent localstoreage-ben eltároljuk.

>**4.)** Post után <>-ilyenbe fel tudjuk készíteni hogy milyen választ várunk.
Ehhez létrehozunk egy AuthToken class-t. Ez akkor fontos ha több infót is kapunk pl mikor jár le és nem csak egy stringet kapunk.

**7.)** Azt is meg kell oldanunk, hogy ha nem vagyunk belépve akkor a logint lássuk ha pedig be vagyunk lépve akkor logout-ot lássuk. Ezt az auth service-ben nézzük, amiben a localstorage-ban megnézzük hogy üres e a tokenünk és ngIf-vel döntjük el hogy melyik jelenjen meg.


> **8b.)** Ha egy menüpontot pl ugyanígy megoldjuk ngIf-vel hogy el legyen rejte valami akkor rárakhatnánk ugyanezt, viszont ez nem jó mert url-ből elérhető így biztonságilag ez nem jó.
Ezért az auth serviceben csinálunk egy olyat, hogy "canActivet()" ami megnézi hogy be van e lépve, majd a app routing-ben rárakunk egy pathra egy canActive-et és átadjuk negi [AuthService]. Ez csak akkorműködik ha auth serviceben is canActive a neve!!!!


> **9.)** Két részre kell bontani hogy rooting alapján elérem e és azt is hogy látom e.  A canActivate neve: "auth Guard"
Azonban ezt is lehet egy kicsit szebben csinálni. Ugyanis a service-nek nem egészen feladata a rooting levédése.
Szóval `ng g guard auth` és ha regeneráljuk akkor felkínál egy interakciós fület. Nekünk a canActivate-kell. és ide illeszük be a logikát ami nézi hogy be vagyunk e jelentkezve. Ezután az approutingban a AuthService helyette az AuthGardot adjuk át a canActivate-nek.



`auth.service.ts:`
```ts auth.service.ts
export class AuthService {

  constructor(private http: HttpClient) { }

  // canActivate(): boolean {
  //   return this.isLoggedIn()
  // }

  isLoggedIn(): boolean {
    const value = localStorage.getItem(environment.tokenKey)
    if (!value) return false
    return value.length > 10
  }

  login(loginModel: LoginModel): void {
    this.http.post<AuthToken>(environment.apis.login, loginModel).subscribe(token => {
      // check and set token expiration etc. here
      localStorage.setItem(environment.tokenKey, JSON.stringify(token))
    })
  }

  logout(): void {
    localStorage.removeItem(environment.tokenKey)
    // call backend logout etc.
  }
}
```

<br>

>**AuthService**: Ez a szolgáltatás kezeli a hitelesítési folyamatokat, beleértve a bejelentkezést, kijelentkezést és a hitelesítési állapot ellenőrzését. A `login()` metódus egy HTTP POST kérést küld az API-nak a bejelentkezési adatokkal, és a válaszként kapott tokent eltárolja a helyi tárolóban. A `logout()` metódus eltávolítja a tokent, míg az `isLoggedIn()` metódus ellenőrzi, hogy van-e érvényes token.

---

### Lépések összefoglalva:
1. Csinálunk egy külön servicet-t ahhoz hogy kezeljük a bejelentkezést: login metódus. És ezt a metódust meghívjuk a login kompononsben.
2. A username és password-ot valahol tárolnunk is kell, ezért csinálunk egy loginModel osztályt, amiben tároljuk ezt a két változót.
3. A következő lépés a backend meghívása. amihez az api.siposm-et használjuk. A service-ben most lekódoljuk a login methódust. És a megkapott tokent localstoreage-ben eltároljuk.
4. Post után <>-ilyenbe fel tudjuk készíteni hogy milyen választ várunk.
5. Csinálunk environmentset is amibe kirakjuk az apit ha már tanultunk ilyet. A tokent is kirakjuk ide egy környezeti változóba.
6. Most megnézzük a logout. Annyira gyorsan lefut hogy fölösleges egy komponens, de a itt csinálunk több dolgot, pl megnézi nincs e folyamatba valami és felugrik egy ablak hogy biztos ki akarsz a lépni. Logout igazából csak egyetlen metódus hívás ezért fölösleges külön komponenes neki.
7. Azt is meg kell oldanunk, hogy ha nem vagyunk belépve akkor a logint lássuk ha pedig be vagyunk lépve akkor logout-ot lássuk. Ezt az auth service-ben nézzük, amiben a localstorage-ban megnézzük hogy üres e a tokenünk és ngIf-vel döntjük el hogy melyik jelenjen meg.
8. Csinálunk egy auth guardot ami megvédi a routingot. Ezt a routing modulban tudjuk megtenni a canActivate-vel. Itt most egy egyszerű logikát használunk, hogy megnézzük van e token a localstorage-ben és ha van akkor engedélyezzük a routingot. Ez egy egyszerűbb megoldás, de lehetne bonyolultabb is pl ellenőrizhetnénk a tokent hogy lejárt e stb.
9. Két részre kell bontani hogy rooting alapján elérem e és azt is hogy látom e.  A canActivate neve: "auth Guard"
10. Végül pedig a routing védelmét nézzük meg. Ezt a routing modulban tudjuk megtenni a canActivate-vel. Itt most egy egyszerű logikát használunk, hogy megnézzük van e token a localstorage-ben és ha van akkor engedélyezzük a routingot. Ez egy egyszerűbb megoldás, de lehetne bonyolultabb is pl ellenőrizhetnéka tokent hogy lejárt e stb.
---




### S.H.
S.H. -> session hijack <br>
A hijack jelentése eltérítés. <br>
Ha valakinek a gépéről ki tudom nyerni a tokenét, akkor utána a saját gépemen a localstorage-be csak beírok a keyt és az értékét.




















