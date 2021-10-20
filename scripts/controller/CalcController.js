class CalcControler{

    constructor(){
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcE1 = document.querySelector("#display");
        this._dateE1 = document.querySelector("#data");
        this._timeE1 = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents()
    }


    initialize(){
        
        this.setDisplayDateTime();

        setInterval(()=>{
        
            this.setDisplayDateTime();

        }, 1000);
    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false);

        })

    }
    // Está funcão permite que o evento EventListener suporte mais de um evento. (No caso o events é enviado um array, e depois tratado)

    setError(){
        this.displayCal = "Error "
    }

    clearAll(){
        this._operation = []
    }

    clearEntry(){
        this._operation.pop()
    }

    addOperation(value){
        this._operation.push(value)
        console.log(this._operation)

    }



    execBtn(value){

        switch (value) {

            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;
            case "soma":
                
                break;
            case "subtracao":
                
                break;
            case "divisao":
                
                break;
            case "multiplicacao":
               
                break;
            case "porcento":
                
                break;
            case "igual":
               
                break;
            case' 0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':   
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }


    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts >g");

        buttons.forEach((btn)=>{
            // BTN representa cada button
            
            this.addEventListenerAll(btn ,'click drag', e=>{
                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);
            })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{
                btn.style.cursor = "pointer"
            })

        })
    }

    // metodo para incializar os buttons. 

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeE1.innerHTML;
    }

    set displayTime(value){
        this._timeE1.innerHTML = value;
    }

    get displayDate(){
        return this._dateE1.innerHTML;
    }

    set displayDate(value){
        this._dateE1.innerHTML = value;
    }


    get displayCal(){
        return  this._displayCalcE1.innerHTML;
    }

    set displayCal(value){
        this._displayCalcE1.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}