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








## TANANYAG: Content-projection

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








## TANANYAG: életciklusok lifecycle
ezeket interfészeken keresztül tudjok elérni.

implements Oninit -> ez egy interfészen keresztül implementálható

amikor seed adatokat akartunk eddig csinálni akkor contruktort használtunk de sokkal jobb helyük van az ngOnInit(): void-van
`ide kell a kód, ahol a konstruktor helyett ngOnInitbe rakjuk a seed movie adatokat`

az életciklosokról azt kell tudni hogy 

van itt ilyen ábra [angular lifecycle](https://angular.dev/guide/components/lifecycle), de sipos készítette a repoba  egy magyar változatot, a https://github.com/siposm/bprof-frontend-weekly/blob/master/angular/materials/lifecycles.md

ez is egy jó kép: https://codecraft.tv/courses/angular/components/lifecycle-hooks/images/lifecycle-hooks.png

a constructor nem egy hook mint a többi. 

Ezek azokat amiket megnézünk és fontos tudni: 

Az ngOnInit-et lehetne a creationbe is rakni, de a changedetectionbe van

### megnézünk ebből jópárat. 3 komponenssel: A, B és child és még egy stringContent class

ami még fontos a lifecycle-ban és kicsit később beszélünk róla az ngFor és a objektum vs primitív típus

stringContent-ben: content:string létrehozása
app-routingba egy path-ot megadunk: compa -> componensA; compb -> componensB

app-component html-be megyünk kövenk létrehozunk kettő gombot ami routerlinkes és beszúrjuk a router-outletet

ezután az A kompones ts-fájlba: contructor és ngOnInit létrehozása és az OnDestroy-t is létrehozzuk. 

most ezeket leteszteljük és megnézzük mit ír ki a console.

Most ezeket még kiegészítjük a child komponenssel. amit a b komponensebe belerakunk, majd a b komponens ts-fájlában kicsit dolgozunk
A childnak adunk két @Input-ot, content és message, majd a B komponensbe hozzá adjuk ezeket.

Érdekesség, hogy ha  ngforral rakosgassuk ki és primitív típussal dolgozunk akkor az ngfor a gyerek kmoponenst kiveszi azaz lefut a ondestroy is és újra lerakja és lefut a constructor, onchanges és oninit is újra a gyerek komponensben


**service**
Ezek az életciklusok a komponensekre vonatkozik. A service-kről még nem beszéltünk nem is véletlen. Azoknak egyszerű az életciklusuk.
A servicek alapvetően singleton-ként jön létre. Tehát mindig ugyanazt az egy példányt kapjuk vissza. Ha van egy service-em és 8 komponens használja akkor nem jön létre újra és újra a service. Ez átállítható hogy ne singleton legyen de az ritka.
Először akkor jönnek létre, ahol/amior dependecy injectionnal megkapja egy komponenens.
Így ezekután nem nagyon beszélhetünk életciklusokról.
IOC `inversion of control` konténerek intézik a serviceket






## TANANYAG: Authetication

Backenden olyan volt ez, hogy voltak api végpontok és voltak ahol voltak lakatok, amit csak bejelentkezett felhasználk tudták használni. Frontend küld pl egy login api hívást, a backend leellenőrzte, hogy beléphet e, ha igen akkor visszaküld egy tokent (pl jwt). Tehát a frontend megkapja a tokent, el kell tárolnunk és utána tudjuk meghívni a többi api-t

Ehhez kell most nekünk egy login és logout komponens, utóbbi elhagyható.
Kell még demoCompA és demoCompB komponensek.

Routingot is összerakjuk.

logout igazából csak egyetlen metódus hívás ezért fölösleges külön komponenes neki.

csinálunk egy külön servicet-t ahhooz hogy kezeljük a bejelentkezést: login metódus. És ezt a metódust meghívjuk a login kompononsben.

A username és password-ot valahol tárolnunk is kell, ezért csinálunk egy loginModel osztályt, amiben tároljuk ezt a két változót.
És ezt a loginModelt példányosítani tudjuk a login komponensben és utána NgModellel összekötjük.és a gombnyomásra átadjuk a service-nek a loginmodel példánynkat.

A következő lépés a backend meghívása. amihez az api.siposm-et használjuk
A service-ben most lekódoljuk a login methódust. És a megkapott tokent localstoreage-ben eltároljuk

post után <>-ilyenbe fel tudjuk készíteni hogy milyen választ várunk.
ehhez létrehozunk egy AuthToken class-t. EZ akkor fontos ha több infót is kapunk pl mikor jár le és nem csak egy stringet kapunk.

csinálunk environmentset is amibe kirakjuk az apit ha már tanultunk ilyet. A tokent is kirakjuk ide egy környezeti változóba.


Most megnézzük a logout. Annyira gyorsan lefut hogy fölösleges egy komponens, de a itt csinálunk több dolgot, pl megnézi nincs e folyamatba valami és felugrik egy ablak hogy biztos ki akarsz a lépni. 
Ez a logout lényegében annyi hogy auth service-ben egy metódussal kitöröljük a locastorage-ben eltárolt tokent


Azt is meg kell oldanunk, hogy ha nem vagyunk belépve akkor a logint lássuk ha pedig be vagyunk lépve akkor logout-ot lássuk. Ezt az auth service-ben nézzük, amiben a localstorage-ban megnézzük hogy üres e a tokenünk és ngIf-vel döntjük el hogy melyik jelenjen meg.

Ha egy menüpontot pl ugyanígy megoldjuk ngIf-vel hogy el legyen rejte valami akkor rárakhatnánk ugyanezt, viszont ez nem jó mert url-ből elérhető így biztonságilag ez nem jó.
Ezért az auth serviceben csinálunk egy olyat, hogy "canActivet()" ami megnézi hogy be van e lépve, majd a app routing-ben rárakunk egy pathra egy canActive-et és átadjuk negi [AuthService]. Ez csak akkorműködik ha auth serviceben is canActive a neve!!!!

Két részre kell bontani hogy rooting alapján elérem e és azt is hogy látom e. 
A canActivate neve: "auth Guard"


Azonban ezt is lehet egy kicsit szebben csinálni. Ugyanis a service-nek nem egészen feladata a rooting levédése.
Szóval "ng g guard auth" és ha regeneráljuk akkor felkínál egy interakciós fület. Nekünk a canActivate-kell. és ide illeszük be a logikát ami nézi hogy be vagyunk e jelentkezve. Ezután az approutingban a AuthService helyette az AuthGardot adjuk át a canActivate-nek.


Még azt nem csináltuk meg hogy token birtokában küldtünk egy api hívást.
header-ben adjuk át a tokent, a bodyba meg azt amit vár az api.
Ezt mi most a componenentB-be csináljuk meg. Törölni akarunk id alapján. Tehát input mezőbe bekérjük az ID-t. majd a deleteJob() metódusban lekódoljuk a törlést
beállítjuk a header-t. 



S.H. -> session hijack
a hijack jelentése eltérítés. 
Ha valakinek a gépéről ki tudom nyerni a tokenét, akkor utána a saját gépemen a localstorage-be csak beírok a keyt és az értékét.




















