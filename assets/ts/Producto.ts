export class Producto {

  private _titulo: string;
  private _imagen: string;
  
  constructor(_titulo:string, _imagen:string) {
    this._titulo = _titulo;
    this._imagen = _imagen;
  }

  set titulo(_titulo:string) {this._titulo = _titulo;}
  get titulo() {return this._titulo;}

  set imagen(_imagen:string) {this._imagen = _imagen;}
  get imagen() {return this._imagen;}
  
  renderizarPlantilla():string {
    return 
        `<li class="portfolio-item2" data-type="web">
            <div class="span4">
              <div class="thumbnail">
                <div class="image-wrapp">
                  <img src="${this._imagen}" alt="Portfolio name" title="" />
                  <article class="da-animate da-slideFromRight" style="display: block;">
                    <h4>${this._titulo}</h4>
                    <a href="detalle1.html"><i class="icon-rounded icon-48 icon-link"></i></a>
                  </article>
                </div>
              </div>
            </div>
          </li>`
  }
}