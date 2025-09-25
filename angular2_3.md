# Angular2 3.hét 3.óra

## TANANYAG: [Viewchild](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/viewchild)

**Folytatjuk azt a témát ahol azt nézzük át, hogyan tudnak komponensek kommunikálni, és adatokat átadni egymás között**

**1.) I/O komponens** <br>
Előző órán tanultuk az `I/O`-t a komponenseknél. Ahol például az `@Input` használatánál a szülő komponens csak annyit tud, hogy van  egy változó a gyermek komponensben aminek át tud adni értéket. Tehát az A komponens ad valamit a B komponensnek, de az A nem tudja hogy a B mit fog azzal csinálni, és a B komponens sem tudja hogy az A komponens mire való és mit csinál.

**2.) viewchild** <br>
Másik módszer a `viewchild` használata. Itt a szülő komponens teljes rálátást kap a gyermek komponensre.  
Teháát az A komponens teljes mértékben eléri a B-t (körülölei)



> Tehát ehhez `@viewchild`-ot kell használni és behivatkozunk ezzel egy másik komponenst, ott annak a komponensnek elérem *mindenét*. 

**Kérdés**: <br>
*Melyiket érdemes használni? Az `I/O` vagy a `viewchild` a jobb?* <br>
Összességében ha lehet, inkább `I/O`-t használjunk, ugyanis az átláthatóbb, és professzionálisabb. A `viewchild` használata során, könnyebben káosz alakulhat ki.




## TANANYAG: Content-projection

ng g c card - csinálunk egy kártyy komponesnt

Content-projection sablon építésre lesz jó. A fókuszon most főleg a html-en és a css-en lesz amikor sablonokat akarunk csinálni.

app-komponensben meghívjuk a card komponenst

csinálunk egy movie osztályt, amibe belerakunk pár dolgot: title, year, intro, contstructorral

app komponensbe ami tekinthető szülőnek. Ott egy listába belerakunk pár Movie elemet.

ezután app komponensen belül hogyan tudnánk a card-ban megjeleníteni? Content-projection egy harmadik mód lesz az eddig tanult I/O és viewchield-on kíbül
Ennek az a lényege, hogy a card komponensen belül van egy olyan hogy ng-content. ami azért speciális mert benne a selector oda fog föl referálni ahol meghívjuk ezt a komponenst tehát most az app komponsensbe

az ng-contentben a select, azt mutatja meg hogy a másik komponsensben aminek ez a neve, az ott lévő tartalom legyen ide átvéve. Tehát nem maga az egész tag kerül át.
Azért ez a neve, mert a tartalom fönt van definiálva és az bele van projektálva a lentebbi részbe
 
margin: 0 auto középre igazít és mindent felül ír, utána külön meg kell adni pl a margin-buttom.

Content-projection fontos része még, hogy nem csak így tudunk átadni dolgokat hanem tudunk extrázni, pl a title-nél meg tudjuk azt csinálni. hogy nem csak nyersen a tartalmat adhatjuk át, hanem stílust is, mert mindent át ad ami a selectoros div-en belül van.
tehát a div-en belül ha még adunk neki félkövéret, dölt stílust stb. akkor azok is mind átkerülnek.
Teljes html kódokat bele lehet projektálni nem csak a tartalmat.

## TANANYAG: templateRef és viewcontainerRef
kettő dolog amit a content projetcionhoz csatlakozik de nem fogjuk külön venni ezeket
Ez a kettő dolog mindenkettő viewchild-ot használ, ez az érdekes benne.

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




















