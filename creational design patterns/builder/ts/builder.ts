interface Builder {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
}

class ConcreteBuilder implements Builder {
    private product = new Product1();

    public reset(): void {
        this.product = new Product1();
    }

    public producePartA(): void {
        this.product.parts.push('PartA1');
    }

    public producePartB(): void {
        this.product.parts.push('PartB1');
    }

    public producePartC(): void {
        this.product.parts.push('PartC1');
    }

    public getProduct(): Product1 {
        const result = this.product;
        this.reset();
        return result;
    }
}

class Product1 {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}\n`);
    }
}

class Director {
    private builder: Builder | undefined;

    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    private getBuilder(): Builder {
        if (!this.builder) {
            throw new Error('A builder must be set before building a product.');
        }
        return this.builder;
    }

    public buildMinimalViableProduct(): void {
        this.getBuilder().producePartA();
    }

    public buildFullFeaturedProduct(): void {
        const builder = this.getBuilder();
        builder.producePartA();
        builder.producePartB();
        builder.producePartC();
    }
}

function clientCodeB(director: Director) {
    const builder = new ConcreteBuilder();
    director.setBuilder(builder);

    console.log('Standard basic product:');
    director.buildMinimalViableProduct();
    builder.getProduct().listParts();

    console.log('Standard full featured product:');
    director.buildFullFeaturedProduct();
    builder.getProduct().listParts();

    console.log('Custom product:');
    builder.producePartA();
    builder.producePartC();
    builder.getProduct().listParts();
}

const director = new Director();
clientCodeB(director);