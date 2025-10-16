# Angular2 5.hét 5.óra

`asp-donte-api-prodcuts` backend programot használjuk

c#-hoz van `echoapi extension` vs code-ban, aminél az api kéréseket tudjuk használni, olyan mint a postman


## TANANYAG: [observable](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/observables)

### stateless -> állapot mentes
ezt lehet alkalamzás, komponenes és service szinten is nézni

Ha van egy dobozunk akkor abban nincs eltárolva konkrét állapot

ennek ellenkezője a statefull. 

Mennyire erősen támazkodik egy belső adatszerekezetre, azaz belső állapotra. 

A stateless azt mondja hogy ne csináljuk egy konkért fizikai állapotot, hanem folyamatosan a backendtől kappjon dolgokat és jelenítse meg, és ne legyen semmilyen lokális állapot.

Ehhez jól illeszkedik az a HTTP protokoll. 

*A HTTP is állapotmentes.*

Konkrét állapot (pl lsita) helyett observable-t hozunk létre, aminek szintén megadhajtuk hogy milyen elemek legyenek pl product.

Ehhez használjuk subscribe-ot és az async pipe-ot


`data.service.ts`-fáljban most konstrukor és dependency injection helyett inject-et használunk

RXJS - függvénykönyvtár, ennek egyik operátora az `of` ami egy observable-t csinál abból amit megadunk neki. És használjuk még a `pipe`-ot is. Ami azért kell mert...
Még egy operátor a `tap`

tap-pel tudunk logolásokat is belerakni ami hasznos nekünk.

használjuk még a `map` operátort ami itt nem ugyanaz mint a sima javascriptes `map`

Obserrvable-t kicsit hasonlóan kell felofgni mint a promisokat. "Majd amikor lesz akkor ez lesz"

Van egy cső amiben bele meg a lista, van egy delay, majd tap és két map és ezután ez fog visszaadódni.

delay azért van benne, hogy szimuláljuk mi lenne ha api végontról hívnánk meg.

#### most átmegyünk az app.component.ts-be.
ha itt egy változót meg akarunk jelölni observable-nek akkor kell hozzá a dollár jel.

ngOnIni-be megtudjuk hívni a serricen keresztül az observableös metódust. 

azonban hogy ezek működjenek úgymond le kell futtatni is. Ezért ezekre a metódusokra rá kell rakni a subscribe-ot.

Ha obserrvabelem van akkor valahol kötzelező subscibolni különben soha nem fog lefutni. 

Azonban most tedjük egyenlővé a this.products$-val a meghívott observable metódust. 
Ebben az esetben ha html-ben meg akarjuk hívni akkor rá kell rakni az async pipe-ot



A subscribe- amit használtunk az kicsit veszélyes.
**memory leak**:
van a kódban egy olyan programozási logikai hiba, hogy fölzabálja a memóriát. 
A gond, hogy felcsatlakozik a subscribe de sosing lecsatlakozás (*dispose*-olva nincs). 

http hívásnlá nem feltétlen tud memory leak kialakulni. 

tehát jön a kérdés hogy a dollárjeles a jobb vagy a subsciribe-os?

csinálnunk kell egy private `subscrition`-t

és azt mondjuk hogy a metódus.subscribe kerüljön belele ebbe a subscripiton-ba és az onDestroy-ban a subscriptionról leiratkozunk.

Mivel az angular fejlődik és az emberek lusták, ezért ezt nem akarjuk megcsinálni, mert ha sok subscipt van akkor ezt sokszor meg kell csinálni, szóval ezért van az async pipe, ami megcsinálja a feliratkozást is és ha szükséges akkor a leiratkozást is.
SZÓVAL az async pipe jobb megoldás mint a subscribe!!


A stateless azért kell hogy ne legyene egy fix álapotunk amiben eltárolunk benne adaokat hanem olyan legyen mintha átfújna rajta a szél, és ehhez használjuk az observable-ket.



- stateless kompoens:
    - nem tárol adatot, hanem mindent @Input / service kap, kezel.
- stateless service:
    - nem tart lokális adatot, mindent API-ról kap.
- statefull service:
    - lokális állapotot tárol (1. BehivorSubject, 2. Signals (ennek semmi köze a signalR-hez))

 observable: mindezt (az említett stateless-es dolgokat) lehetővé teszi

 memory leak: a program a lefoglalt memóriá nem szabadítja fel miután már nem használja.

 rxjs: reactive extensions for javascript
 reaktív programozási könyvtár, aminek segítségével stream-ekkel (adatfolyamokkal, pl: observable) tudunk dolgozni és ezekhez dekleratív (!) módon tudunk logikát írni.


> **A reaktív programozás azt omndja:** *ne kérdezd meg hogy változott e valami, hanem inkább iratkozz fel és reagálj amikor megváltozik.*

## TANANYAG: [signalr-observables-interceptor](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/signalr-observables-interceptor)

`dotnet restore` majd `dotnet run` 


behavior subject-et használunk 
behaviorsubject-nél a .next új érték kibocsátására alkalmas és a másik fontos dolog a .value

BehaviorSubject:
- next
- value
`product.service.ts`
``` ts product.service.ts
  // A BehaviorSubject használatának az a lényege, hogy nem csupán egy adatfolyamot (streamet) biztosít,
  // hanem mindig tartalmazza az aktuális értéket is. Ez azt jelenti, hogy bármikor lekérdezhető 
  // a legutolsó állapot (.value), és szükség esetén új értéket is lehet kibocsátani a .next() metódus 
  // segítségével. A szolgáltatásban ezért szokás egy privát BehaviorSubject-et létrehozni, 
  // amely az adatokat kezeli és frissíti, míg a komponensek számára ennek csak az olvasható formáját, 
  // azaz az Observable-t tesszük elérhetővé az asObservable() metódussal. 
  // Így a komponensek megfigyelhetik az adatváltozásokat, de nem tudják közvetlenül módosítani az 
  // állapotot, ami biztonságosabb és átláthatóbb architektúrát eredményez.
```

Ezt úgy tudjuk elkpézelni hogy az van egy service amit ketté osztunk, és a hátsó részében van a behaviorsubject, ami létrehoz stateful jellegű dolgot, amit okosan kezel, mert folyamatosan frissül. És erre jön rá az hogy `as Observable`
a signalR-rel az apin keresztül folyamatosan frissül a stateful behaviorsubject, ami után az `as observable`-n keresztül szól a többieknek hogy változott. És fontos hogy a komponensek vagy async pipe-ot vagy subscribe-ot használjanak.

És most megnézzük hogy a komponensek hogyan csatlakoznak erre: [app.component.ts](https://github.com/siposm/bprof-frontend-weekly/blob/master/angular/signalr-observables-interceptor/frontend/src/app/app.component.ts). ngoninit be meghívjuka service init-jét, majd products$-ba belerakjuk az observable


### TANANYAG: [interceptor](https://github.com/siposm/bprof-frontend-weekly/blob/master/angular/signalr-observables-interceptor/frontend/src/app/error.interceptor.ts)

a programunkban a serviceben a deletenél nem adtuk át headert úgy mint korábban és ez interceptor miatt van.
`ng g interceptor`

ennek feladata, hogy amikor sok különböző api hívásunk van, és nem akarjuk egyesével beírogtanki hogy baerer token..., akkor ez beékelődik minden api hívásba és itt pl most a deletenél berakjuk hogy mi legyen a header. 
Nagyon fontos a throwError rész. az interceptor amikor elküldök egy post kérést az apinak, akkor ezt megnézi az interceptor, nem csinál vele semmit mert nem delete, és amikor jön vissza az api hívás akkor ha hiba van akkor az interceptor ezt továbbtobja és így eljut a service-hez is vagy akár a komponennshez is.

nem csak arra jó hogy pl hibákat lekezel, hanem logolni is tudja a ki és bemenő api hívásokat, vagy válaszidő teljesítményt nézni azt is az interceptor tudja. 

ez egy: _dekorátor tervezési minta_

Hogyan működik a signalR a háttérben: 
A signalR folyamatos kapcsolatot tart fenn. a signalR több technológiát is használ, websockets, server-sent events (SSE) és  long polling (lp)

1. ✔ Websocket: állandó kapcsolat, 2 írányú, mindkét fél küldhet (legjobb megoldás ha a backenden és a frontenden is van websocket)
2. SSE: server küld adatokat egyirányúan, HTTP-n keresztül
3. long polling: kliens HTTP kapcsolatot hosszú ideig fentart. Szerver akkor válaszol csak, ha van új adat.



