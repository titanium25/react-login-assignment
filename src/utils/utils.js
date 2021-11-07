export const addZero = (number)=>{
    while(number.toString().length < 2){
        number = "0" + number;
    }
    return number;
}