class Point {
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    printXY(){
        console.log(this.x,this.y)
    }

}

// let t = new Point(2,5)
// t.printXY();

module.exports = Point;