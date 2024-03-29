function calculate() {
    if (isNaN(Number(document.getElementById("input_").value))) {
        document.getElementById("text_").innerText = "Please enter a number!";
    } else if (Number(document.getElementById("input_").value) < 0 || Number(document.getElementById("input_").value) > 300) {
        document.getElementById("text_").innerText = "Please enter a possible value!";
    } else {
        let num = Number(document.getElementById("input_").value) / 300;
        let out = ai.fire([num, num, num]);
        let size = (out[0] + out[1] + out[2]) * 100;
        document.getElementById("text_").innerText = "Your height has been calculated as %size%cm!".replace("%size%", Math.round(size * 100) / 100);
    }
}

function enter() {
    if(event.key === 'Enter') {
        calculate();      
    }
}

let data, ai;

fetch('./20.ai')
  .then(response => response.text())
  .then((data) => {
    ai = new AI(data.split(/\r?\n/));
  })

AI = class {
    constructor(s) {
        this.load(s);
    }

    load(s) {
        this.layers = Array(s.length);
        //console.log(data);
        //console.log(data.length);
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i] = new Layer(s[i]);

        }
    }

    fire(inp) {
        for (let i = 0; i < this.layers.length - 1; i++) {
            inp = this.layers[i].fire(inp);
            //console.log(inp);
        }

        return inp;

    }
}

Layer = class {

    constructor(s) {
        this.load(s);
    }

    fire(llo) {// last layer out
        let out = Array(this.neurons.length);
        for (let i = 0; i < this.neurons.length; i++) {
            out[i] = this.neurons[i].fire(llo);
        }
        out.pop();//removes NaN
        return out;
    }

    load(s) {
        let ss = s.split("]");
        this.neurons = Array(ss.length);
        for (let i = 0; i < this.neurons.length; i++) {
            this.neurons[i] = new Neuron(ss[i]);
            //console.log(i);
        }
    }

}

Neuron = class {
    /*constructor(pll){
      this.ws = Array(pll);
      this.bias = 0;
    }*/
    constructor(s) {
        this.load(s);
    }

    fire(llo) {
        let output = parseFloat(0);
        for (let i = 0; i < llo.length; i++) {
            output += this.ws[i] * llo[i];
        }
        output += this.bias;

        output = 1 / (1 + Math.pow(Math.E, -output));
        return output;
    }


    load(s) {
        let ss = s.split(";");
        this.bias = parseFloat(ss[0]);
        this.ws = Array(ss.length - 1);
        for (let i = 1; i < ss.length; i++) {
            this.ws[i - 1] = parseFloat(ss[i]);
        }
    }
}