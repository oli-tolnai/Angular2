# Angular2 4.hét 4.óra

autg.login-simple-token-re lett átnevezve az órai feladat.

ismétlésként rajzolás közben megbeszétük hogyan működik a bejelentkezés majd egy elemek listázása és a backend és frontend hogyan kommunikál

## TANANYAG: auth-login-jwt

> dotnet run-nal tudjuk futtatni a backendet és nem visual studioban kell megnyitni és futtatni

> néha a vs code terminálból nem fut le akkor próbáljuk meg külső parancssorból

**maga a jwt nem hashelve van hanem az egy kódolás.**
> A hashelés alapvetően egy egyirányú folyamat, van valamilyen bemenet, nem lehet ugyanazon az írányba visszafejteni, a hash visszafordítás úgy náz ki hogy többezerszer lehashelik és egyszer megkapják azt amit. Az input legkisebb változtazásra is teljesen különböző hash lesz


routing-nál role-okat is be lehet állítani

routing levédése az authguard feladata, de kb minden mást az authservice csinál

authguard-nál fontos az inject(), amit lehet nem osztályoknál is használni, nem úgy mint a dependency injection-nél, de kb ugyanazt csinálja

---
---
<br>


## TANANYAG: Tesztelés

**Miért kell tesztelni?**
- ne legyen hiba
- kód komplexitás nő -> hiba nő
- teszteset = mit kell csinálnia a programnak
- megismételhetőség
- kód módosítás / refaktorálás

> ami fontos hogy a kód komplexitással a hiba nő. Főleg ha nem egyedül írod a kódot, akkor végképp nem érted hogy mi történik. Kód komplexitásnál az is fontos tényező hogy egyedül vagy nem egyedül írod.

> a tesztekből lehet jól megérteni egy programot, ha a jól megírt teszteket végig nézzük akkor abból hamar kiderül hogy egy egy komponensnek mi is a célja, mert a teszteket a fő funkiókra írjuk meg.

Ha valami módosítok, vagy másvalaki módosít valamit a saját kódján akkor a tesztek alapján hamar kiderül hogy el lett e rontva valami.

**Tesztelés típusok:**
- (edge-case teszt) - ez szélsőséges eseteket néz
- (mock) - ez nem tesztelési módszer, hanem ez unit teszteknél használandó eszköz
- unit = egységteszt
- stressz teszt - nagy terhelés alá, olyanis akár ami nem valószínű hogy be fog következni. pl ha 2000 fővel számolunk hogy kb ennyien fogják használni, akkor leteszteljük pl 5000fővel - ide tartozik a DOS és DDOS támadás
- manuális teszt - nem megismételhető

a unit külön részekre koncentrál, e fölött van az integrációs tesztelés és van az E2E end to end tesztelés
 

 
**Angularban ezeket szoktuk használni**
- service (FRONTEND oldal business logikája)
- komponens
- model -> class, interface, type
    - interface és type esetében nincs értelme tesztelésnek
    - classnál akkor értelmes tesztelni, ha van valami plusz metódus/logika benne
    
> service-nél nem kell tesztelni a httpClient kéréseket, mert ott lényegében a backendet tesztelnénk. Tesztelésnél az általunk írt logikákat kell tesztelni.

> amikor a komponens service-t használ akkor nem azt kell letesztelni hogy benne a service jól működik, hanem a komponensben megírt saját logikákat kell tesztelni

### Tesztelés
- describe-val kezdődik és leírjuk hogy `it` tehát maga a teszt mit vár el  `expect`

app.component.ts-ben is van alapvetően spec.ts teszt fájl

beforeEach jelentése: valami előtt mindig lefut (utána kéne nézni)

`ng test` -> tesztek futtatása

Ezután megnyílik egy böngésző amiben látunk több mindent

**Karma** -> Teszt futtató környezet
**Jesmie** -> JS teszt környezet

"headless" -> meglehet csinálni azt hogy a tesztek futtatásakor a böngészőt ne nyissa meg

Három 'A'
- Arrange - előkészít
- Act - konkrétan maga a múvelet
- Assert - konkrétan mege a teszt eredménye 




```ts
getAll() : Student[]{
    return [...this.students] // -> ... jelentése hogy nem referenciaként ajda át hanem a másolatát
}
```

Tesztelésnél fontos, hogy egy egy service nem beágyazott adatokkal dolgozna, hanem gettel szerezne adatokat API-val és így azt nem kell tesztelni, mert akkor a htttpClient-et teszteljük.
Ennek ellenére le kell tesztelni a benne lévő metódusokat, szóval jön a kérdés hogy api hívás nélkül hogyan tesztelem le? 
A válasz az, hogy a tesztben a beforeEach()-ben létrehozunk seed adatokat.


### Teszteket kell csinálni ölab-hoz, itt viszont annyira ezt nem tanuljuk 

` test --code-coverage`

`Branches`:
if (name...)
    [Igaz] <- első ág
else
    [hamis] <- második ág
ha egy ilyet akarunk tesztelni akkor minden ágat tesztelni kell


[testing.md]("https://github.com/siposm/bprof-frontend-weekly/blob/master/angular/materials/testing.md")

**test double eszköztár**: ezeket érdemes tudni, a spy-on kívül a többi hasonlít egymáshoz

### A TESZTEKET GENERÁLHATJUk AI-VAL ÖLABON

chatgpt-nek be kell adni a ts-t és a html-t is 5-6 tesztet kérünk tőle és átnézzük

# TANANYAG: [reactive forms](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/reactive-form)


> tesztelésnél ha van olyan function amit több tesztben is hasznánnk akkor a describe-on belül lehet csinálni functionokat

