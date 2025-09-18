# Angular 2. hét, 2. óra
 
## TANANYAG: Ismétlés

### Mobile first vs Desktop first
Ha M.F.-ben elsőnek megnyitjuk telefonos nézetben és elkészítjük a megfelelő css fájlt. De amikor átmegyünk desktopra akkor nem fog jól kinézni
- "A" opció, hogy így ahhoz készítünk egy külön css-t, és js ami le tudja kérni a kijelző méretét, eldönti, hogy melyik css kell
- "B" opció, hogy media query-kel ugyanabban a css fájlban megírjuk a desktopra megfelelő css-t

**css box model:** *`tartalom -> padding -> border -> margin`* (belülről kifele, mint egy hagyma)
 

## TANANYAG: [komponensek haladó szintű kezelése](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/angular-component-io)

```bash
ng new angular-componenet-io --standole=false
```

### Megnézzük az input-output kezelést

```bash
ng g c parent
ng g c child
```

> A komponensek ugyanannyira univerzálisan felhasználható mint pl c#-ban egy osztály


### @Input - @Output:
__Input:__ Amikor a parent komponensbe belerakjok a child komponenst, akkor a child komponensbe bele tudunk olyan elemeket rakni amik a parent komponenesben találhatóak meg.

__Output:__ A child komponensben van egy gomb de azt szeretnémhogy a parent komponsensen történjen valami, és egy ottani függvény fusson le.

---
`MyObject class`:
```ts MyObject class
export class MyObject {
  content: string = ""
  priority: number = 0
  constructor(content: string = "", priority: number = 0) {
    this.content = content
    this.priority = priority
  }
}
```
---
`ts parent:`
```ts parent
dataItems: MyObject[] = []
constructor() {
    this.dataItems.push(new MyObject("alma", 3))
    this.dataItems.push(new MyObject("körte", 5))
    this.dataItems.push(new MyObject("szilva", 10))
    this.dataItems.push(new MyObject("barack", 2))
}
hello(message: MyObject): void {
    console.log(message)
}

```
---
`html parent:`
```html parent
<div>
    <h1>PARENT</h1>
    <app-child *ngFor="let item of dataItems"
        [item]="item"
        (message)="hello($event)"
    ></app-child>
</div>
```
---
`ts child:`
```ts child
  @Input() item: MyObject = new MyObject()
  @Output() message: EventEmitter<MyObject>= new EventEmitter<MyObject>()

  childHello(): void {
    this.message.emit(this.item)
  }
```
---
`html child:`
```html child
<div>
    <h5>{{ item.content }} - {{ item.priority }}</h5>
    <button (click)="childHello()">Child says hello</button>
</div>
```

---

![input-output.png](https://github.com/oli-tolnai/Angular2/blob/main/kepek/input-output.jpg)


Ezekkel lehetőségünk van például a bootstrap cardokhoz hasonlóakat csinálni. Létrehozhatunk egy sablon komponenst, aminek a tulajdonságait egy másik komponensen belül adjuk meg. Erre példa az [angular-button-component](https://github.com/siposm/bprof-frontend-weekly/tree/master/angular/angular-button-component), ahol van egy `button` komponensünk, amit beleillesztünk az `app` komponensbe, ahol megadjuk neki, hogy mi legyen a felirat, milyen stílusú legyen stb. És ehhez elegendő nekünk az `@Input`-ot használni