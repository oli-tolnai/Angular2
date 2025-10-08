# Angular2 4.hét 4.óra

## TANANYAG: Ismétlés - authentikáció egyszerű tokennel, nem jwt-vel

Ábrákon keresztül átbeszéltük, hogy hogyan kommunikál a frontend és a backend bejelentkezés majd elemek listázása során.

![angular2_4_1-auth](https://github.com/oli-tolnai/Angular2/blob/main/kepek/angular2_4_1-auth.png)

Az első ábrán a bejelentkezés folyamata látható. Input mezőkbe beírjuk a bejelentkezéshez szükséges adatokat (username, password), majd a submit gombra kattintva elküldjük a bejelentkezési kérést a backendnek. A backend ellenőrzi az adatokat, és ha helyesek, akkor visszaküld egy tokent JSON formátumban, amelyet a frontend elment a böngészőben (pl. localStorage-ben vagy sessionStorage-ben). Ez a token szolgál azonosítóként a későbbi kérésekhez.

![angular2_4_2-auth](https://github.com/oli-tolnai/Angular2/blob/main/kepek/angular2_4_2-auth.png)

A második ábrán egy védett erőforrás elérésének folyamata látható. Amikor a felhasználó megpróbál hozzáférni egy védett erőforráshoz (pl. egy lista megtekintése), a frontend elküldi a kérést a backendnek, és a kérés fejléceiben elküldi a korábban kapott tokent. A backend ellenőrzi a tokent, és ha érvényes, akkor visszaküldi a kért adatokat (pl. egy elemek listáját) JSON formátumban. Ha a token érvénytelen vagy hiányzik, akkor a backend visszaküld egy hibakódot (pl. 401 Unauthorized), és a frontend ennek megfelelően reagál.

---
---
<br>

## TANANYAG: [auth-login-jwt](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/auth-login-jwt)

> Terminálból a backendet `dotnet run`-nal tudjuk futtatni és nem visual studioban kell megnyitni és onnan futtatni. Ha futtatáskor https-t szeretnénk akkor `dotnet run --launch-profile "https"`-t kell használni. 


**A JWT nem hashelve van hanem az egy kódolás.**
- A hash egy olyan érték, amelyet egy adott bemenetből (például jelszóból) egy speciális algoritmus segítségével generálnak. A hash érték egyedi és fix hosszúságú, és célja, hogy a bemenetet egy rövid, könnyen kezelhető formában reprezentálja. A hash értékek általában nem visszafejthetők, ami azt jelenti, hogy nem lehet visszanyerni az eredeti bemenetet a hash értékből. 

- Visszafejtés helyett a hash értékeket általában összehasonlítják egy másik hash értékkel, amelyet ugyanazzal az algoritmussal generáltak egy adott bemenetre. Ha a két hash érték megegyezik, akkor valószínűleg a bemenetek is megegyeznek.



**Angularban a routing-nál role-okat is be lehet állítani:**
```ts
 // Bejelentkezés szükséges (de nincs role megkötés)
  { path: "compb", component: DemoCompBComponent, canActivate: [authGuard] },
  
  // Csak ADMIN számára elérhető útvonal
  {
    path: 'admin', component: AdminOnlyComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  },
```

> A routing levédése az authGuard feladata, de kb minden mást az authservice csinál.

authguard-nál fontos az inject(), amit lehet függvényeknél is használni, nem úgy mint a dependency injection-t, amelyet csak osztályoknál lehet használni- Ilyenkor a függvényen belül tudunk szolgáltatásokat injektálni.

```ts
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)

  // 1) be van-e jelentkezve (exp alapján is)
  if (!auth.isLoggedIn()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false
  }

  // 2) ha a route megkövetel szerepet
  const required = route.data?.['roles'] as string[] | string | undefined
  if (required && !auth.hasRole(required)) {
    // nincs jogosultság
    router.navigate(['/login'], { queryParams: { reason: 'forbidden' } })
    return false
  }
  return true
}
```

---
---
<br>


## TANANYAG: [Tesztelés](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/testing)

**Miért kell tesztelni?**
- ne legyen hiba
- kód komplexitás nő -> hiba nő
- teszteset = mit kell csinálnia a programnak
- megismételhetőség
- kód módosítás / refaktorálás

> Minél komplexebb a kód annál nagyobb az esélye hogy hiba lesz benne, ezért is kell tesztelni, mert ha van egy jól megírt teszt akkor a kód módosításakor hamar kiderül hogy valami el lett e rontva.

*Ha valamit módosítok, vagy másvalaki módosít valamit a saját kódján akkor a tesztek alapján hamar kiderül hogy el lett e rontva valami.*

> Tesztekből a kód működését is jól meg lehet érteni, mert ha a jól megírt teszteket végig nézzük akkor abból hamar kiderül hogy egy egy komponensnek mi is a célja, mert a teszteket a fő funkiókra írjuk meg.



**Tesztelés típusok:**
- (edge-case teszt) - ez szélsőséges eseteket néz
- (mock) - ez nem tesztelési módszer, hanem ez unit teszteknél használandó eszköz
- unit = egységteszt
- stressz teszt - nagy terhelés alá, olyanis akár ami nem valószínű hogy be fog következni. pl ha 2000 fővel számolunk hogy kb ennyien fogják használni, akkor leteszteljük pl 5000fővel - ide tartozik a DOS és DDOS támadás
- manuális teszt - nem megismételhető


![tesztelés típusok](https://github.com/oli-tolnai/Angular2/blob/main/kepek/angular2_4_2-testss.png)

Legalul a unit tesztelés van, ez a legkisebb egység tesztelése. Efölé van az integrációs tesztelés, ahol több komponenst együtt tesztelünk. Végül a legfelső szinten van az end to end tesztelés, ahol a teljes alkalmazást teszteljük úgy mintha egy felhasználó használná.

 

 
**Angularban ezeket szoktuk használni**
- service (FRONTEND oldal business logikája)
- komponens
- model -> class, interface, type
    - interface és type esetében nincs értelme tesztelésnek
    - classnál akkor értelmes tesztelni, ha van valami plusz metódus/logika benne
    
> service-nél nem kell tesztelni a httpClient kéréseket, mert akkor ott lényegében a backendet tesztelnénk. **Tesztelésnél az általunk írt logikákat kell tesztelni.**

> amikor egy komponens service-t használ akkor nem azt kell letesztelni hogy benne a service jól működik-e, **hanem a komponensben megírt saját logikákat kell tesztelni.**

### Tesztelés

Tesztelés fontos részei: `describe`, `beforeEach`, `it`, `expect`:
- `describe` -> ez egy teszt csomag, ez alatt vannak a tesztek
- `beforeEach` -> ez egy setup rész, itt lehet előkészíteni dolgokat, ez minden teszt előtt lefut
- `it` -> ez egy teszt eset, ez alatt van maga a teszt
- `expect` -> ez maga a teszt, itt van leírva hogy mit várunk el


#### Tesztek futtatása:
- **`ng test` -> tesztek futtatása**

- Ezután megnyílik egy böngésző amiben látunk több mindent:
    - **Karma** -> Teszt futtató környezet
    - **Jesmie** -> JS teszt környezet

Meglehet csinálni azt hogy a tesztek futtatásakor a böngészőt ne nyissa meg:
- `ng test --watch=false --browsers=ChromeHeadless`-t kell használni.



### **Három 'A'**
- Arrange - előkészít
- Act - konkrétan maga a múvelet
- Assert - konkrétan maga a teszt eredménye 

---
```ts
getAll() : Student[]{
    return [...this.students] // -> ... jelentése hogy nem referenciaként ajda át hanem a másolatát
}
```
> A három pont a `spread operator`, ami azt jelenti hogy a tömb elemeit egyesével kiveszi és egy új tömbbe teszi bele. Így nem referenciaként adja át a tömböt hanem annak egy másolatát.
---

Tesztelésnél fontos, hogy ha egy service nem beágyazott adatokkal dolgozik, hanem gettel szerez adatokat API-val, így azt nem kell tesztelni, mert akkor a htttpClient-et tesztelnénk.<br   >
Ennek ellenére le kell tesztelni a benne lévő metódusokat, szóval jön a kérdés hogy *api hívás nélkül hogyan tesztelem le?*<br>
A válasz az, hogy **a tesztben a beforeEach()-ben létrehozunk seed adatokat.**


### Teszteket kell csinálni ölab-hoz, itt viszont annyira ezt nem tanuljuk 

`test --code-coverage`

`Branches`:
```ts
if (name...)
    [Igaz] <- első ág
else
    [hamis] <- második ág
```
**Ha egy ilyet akarunk tesztelni akkor minden ágat tesztelni kell!**

Alábbi dokumentumban részletesen olvashatunk a tesztelésről: [siposm/testing.md]("https://github.com/siposm/bprof-frontend-weekly/blob/master/angular/materials/testing.md")<br>
A dokumentumban a **test double eszköztár** fontos. Ezeknél a legtöbb hasonlít egymásra, kivéve a `spy`.

#### Ölab-on a teszteket generálhatjuk AI-val
Ehhez chatgpt-nek be kell adni a `ts`-t és a `html`-t is, és 5-6 tesztet kérünk tőle és átnézzük, ugyanis sokszor értelmetlen teszteket is készít.

> tesztelésnél ha van olyan function amit több tesztben is használnánk akkor a describe-on belül lehet csinálni functionokat.

# TANANYAG: [reactive forms](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/reactive-form)

Ezt a részt csak felületesen érintettük, így érdemes letölteni a kódot és átnézni.



