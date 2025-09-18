# Angular 2. hét, 2. óra
 
## TANANYAG: Ismétlés

### Mobile first vs Desktop first
Ha M.F.-ben elsőnek megnyitjuk telefonos nézetben és elkészítjük a megfelelő css fájlt. De amikor átmegyünk desktopra akkor nem fog jól kinézni
- "A" opció, hogy így ahhoz készítünk egy külön css-t, és js ami le tudja kérni a kijelző méretét, eldönti, hogy melyik css kell
- "B" opció, hogy media query-kel ugyanabban a css fájlban megírjuk a desktopra megfelelő css-t

**css box model:** *`tartalom -> padding -> border -> margin`* (belülről kifele, mint egy hagyma)
 

## TANANYAG: komponensek haladó szintű kezelése

```bash
ng new angular-componenet-io --standole=false
```

> megnézzük az input-output kezelést

```bash
ng g c parent
ng g c child
```

> a komponensek ugyanannyira univerzálisan felhasználható mint pl c#-ban egy osztály

Fő komponens: app, ezen belül van egy parent komponens és a parentben van egy child komponens, és azt szerentnénk hogy a parent-ben van egy tömbünk és a childnak át akarjuk adni ezt a tömböt.

### input:

`ts child:`
```ts child
@Input() item: MyObject = new MyObject()
```

`html child:`
```html child
<h1>{{item.content}}</h1>
```

`html parent:`
```html parent
<app-child
    [item]="dataItems[0]"
>
</app-child>

<app-child *ngFor="let item of dataItems"
    [item]="item"
>
</app-child>
```

 ### output:
> A child komponensben van egy gomb de azt szeretnémhogy a parent komponsensen történjen valami. Ehhez kell az output

`html child:`
```html child
<h1>{{item.content}}</h1>
<button (click)="childHello()">Click</button>
```

`ts child:`
```ts child
@Input() item: MyObject = new MyObject()

@Output() message: EventEmitter<MyObject>= new EventEmitter<MyObject>()

childHello(): void {
    this.message.emit(this.item)
}
```

`html parent:`
```html parent
<app-child
    [item]="dataItems[0]"
    (message)="hello($event)"
>
</app-child>
```

`ts parent:`
```ts parent
hello(message)

ide kell még a kód
```

**FOTÓ kell ide**


