class CalcControler{

    constructor(){
        this._locale = 'pt-BR';
        this._displayCalcE1 = document.querySelector("#display");
        this._dateE1 = document.querySelector("#data");
        this._timeE1 = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
    }


    initialize(){
        
        this.setDisplayDateTime();

        setInterval(()=>{
        
            this.setDisplayDateTime();

        }, 1000);
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts >g");
    }

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