class Prototype {
    public primitive?: number;
    public complex?: Date;
    public circularReference?: componentWithBackReference;

    public clone(): this {
        const clone = Object.create(this);

        clone.complex = Object.create(this.complex!);
        clone.circularReference = new componentWithBackReference(clone);

        return clone;
    }
}

class componentWithBackReference {
    public prototype;  

    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}

function clientTestCode() {
    const p1 = new Prototype();
    p1.primitive = 245;
    p1.complex = new Date();
    p1.circularReference = new componentWithBackReference(p1);

    const p2 = p1;//.clone();
    if (p1.primitive === p2.primitive) {
        console.log('Primitive field values have been carried over to a clone. Yay!');
    } else {
        console.log('Primitive field values have not been copied. Booo!');
    }
    if (p1.complex === p2.complex) {
        console.log('Simple component has not been cloned. Booo!');
    } else {
        console.log('Simple component has been cloned. Yay!');
    }

    if (p1.circularReference === p2.circularReference) {
        console.log('Component with back reference has not been cloned. Booo!');
    } else {
        console.log('Component with back reference has been cloned. Yay!');
    }

    if (p1.circularReference?.prototype === p2.circularReference?.prototype) {
        console.log('Component with back reference is linked to original object. Booo!');
    } else {
        console.log('Component with back reference is linked to the clone. Yay!');
    }

    if (p1 === p2) {
        console.log('Prototype has not been cloned. Booo!');
    } else {
        console.log('Prototype has been cloned. Yay!');
    }


console.log(JSON.stringify(p1));
    // const p3 = JSON.parse(JSON.stringify(p1));
    // console.log('p3: ', p3);
}

clientTestCode();