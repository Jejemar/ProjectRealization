const template = document.createElement('template');

template.innerHTML = `
  <style>    
  * {
  box-sizing: border-box;
}

body {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Courier, Arial, sans-serif;

}

.container {
  display: flex;
  flex-direction: row;

}

.block {
  position: relative;
  width:250px;
  height:250px;
  background: url(./Picture1.jpg);
  margin-top: 250px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-size: cover;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
  
}

.button {
  position: relative;
  width:30px;
  height:30px;
  border-radius:100%;
  background-color:rgb(106, 106, 106);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.button-hidden {
  width:30px;
  height:30px;
  border-radius:100%;
  background-color:rgb(106, 106, 106);
  display: none;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: absolute;
  margin-left:200px;
}

h4 {
  font-size: 20px;
  color:rgb(255, 255, 255);
  width:190px;
  background-color:black;
  padding: 10px;
  border-radius:15px;

}

.bottom {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:space-between;   
  width:230px;    
}

.behind {
  position: absolute;
  width:250px;
  height:250px;
  background: rgb(0, 0, 0);
  margin-top: 250px;
  opacity:0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

p {
  position: absolute;
  opacity: 0;
  width:230px;
  color:rgb(255, 255, 255);
  margin-top: 50px;
}
  </style>

    <div class="container">        
        <div class="block" id="block">
            <div class="behind" id="behind1"></div>
            <p id="text">Scaling/zooming animations are problematic for accessibility,<br> as they are a common trigger for certain types of migraine. If you <br> need to include such animations on your website, you should provide a control to allow users to turn off animations, preferably site-wide.
                Also, consider making use of  
                </p>
            <div class="bottom">
                <h4 id="label">Consultation and requirements analysis</h4>
                <button class="button" id="button1">></button>
                <button class="button-hidden" id="button2"><</button>                
            </div>
        </div> 
    </div>
`;

class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$button = this._shadowRoot.querySelector('#button1');
    this.$behind = this._shadowRoot.querySelector('#behind1');
    this.$button2 = this._shadowRoot.querySelector('#button2');
    this.$text = this._shadowRoot.querySelector('#text');
    this.$block = this._shadowRoot.querySelector('#block');
    this.$label = this._shadowRoot.querySelector('#label');

    this.$button.addEventListener('click', () => {
        this.$behind.style.transform = 'translateX(250px) scale(1,1)';
        this.$behind.style.transitionDuration = '0.5s';
        this.$behind.style.borderTopRightRadius = '30px';
        this.$behind.style.borderBottomRightRadius = '30px';
        this.$behind.style.opacity = '1';
        this.$button.style.display = "none";
        this.$button2.style.display = "flex";
        this.$text.style.opacity = '1';
        this.$text.style.fontSize = '14px';
        this.$text.style.transform = 'translateX(255px)';
        this.$text.style.marginBottom = '20px';       
      });
      
      this.$button2.addEventListener('click', () => {
        this.$behind.style.transform = 'scale(1,1) translateX(0)';
        this.$behind.style.transitionDuration = '0.5s';
        this.$behind.style.opacity = '0';
        this.$button.style.display = "flex";
        this.$button2.style.display = "none";
        this.$text.style.opacity = '0';
        this.$text.style.transitionDuration = '0.5s';
        this.$behind.style.borderTopRightRadius = '0';
        this.$behind.style.borderBottomRightRadius = '0';   
      });
      

    
  }
  
  static get observedAttributes() {
    return ['label', 'text', 'url'];
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get text() {
    return this.getAttribute('text');
  }

  set text(value) {
    this.setAttribute('text', value);
  }

  get url() {
    return this.getAttribute('url');
  }

  set url(value) {
    this.setAttribute('url', value);
  }

  // static get observedAttributes() {
  //   return ['label', 'text'];
  // }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$label.innerHTML = this.label;
    this.$text.innerHTML = this.text;
    this.$block.style.backgroundImage = this.url;
  }

}

window.customElements.define('my-button', Button);