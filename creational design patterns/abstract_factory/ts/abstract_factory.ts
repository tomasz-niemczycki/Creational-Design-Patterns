interface abstractFactory {
    createProductA(): abstractProductA;
    createProductB(): abstractProductB;
}

interface abstractProductA {
    usefulFunctionA(): string;
}

interface abstractProductB {
    usefulFunctionB(): string;
    anotherUsefulFunctionB(collaborator: abstractProductA): string;
}

class ConcreteFactory implements abstractFactory {
    public createProductA(): abstractProductA {
        return new ConcreteProductA();
    }

    public createProductB(): abstractProductB {
        return new ConcreteProductB();
    }
}

class ConcreteProductA implements abstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A.';
    }
}

class ConcreteProductB implements abstractProductB {
    public usefulFunctionB(): string {
        return 'The result of the product B.';
    }   

    public anotherUsefulFunctionB(collaborator: abstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B collaborating with the (${result})`;
    }
}

function codeTest(factory: abstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}

console.log('Client: Testing client code with the first factory type...');
codeTest(new ConcreteFactory());