
abstract class Creator {
    public abstract factoryMethod(): Product;
    
    public someOperation(): string { 
        const product = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

interface Product {     //interfejs produktu, który będzie tworzony przez fabrykę
    operation(): string;
}
class conCreator1 extends Creator {
    public factoryMethod(): Product {
        return new conProduct1();
    }
}

class conCreator2 extends Creator {
    public factoryMethod(): Product {
        return new conProduct2();
    }
}

class conProduct1 implements Product {
    public operation(): string {
        return '{Result of the conProduct1}';
    }
}

class conProduct2 implements Product {
    public operation(): string {
        return '{Result of the conProduct2}';
    }
}

function clientCode(creator: Creator) {
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
}

console.log('App: Launched with the conCreator1.');
clientCode(new conCreator1());

console.log('App: Launched with the conCreator2.');
clientCode(new conCreator2());