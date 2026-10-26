class Singleton {
   private static instance: Singleton; 

   private constructor() {}  //prywatny konstruktor, aby nie można było tworzyć instancji klasy z zewnątrz

   public static getInstance(): Singleton {     //Metoda sprawdzająca instancję, jeżeli nie ma to ją tworzy i zwraca a jak jest to zwraca istniejącą
      if (!Singleton.instance) {
         Singleton.instance = new Singleton();
      }
      return Singleton.instance;
   }

   public showText(): void {        //metoda czysto do testów
      console.log("Test klasy Singleton");
   }
}

const singleton1 = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

if (singleton1 === singleton2) {
   console.log("singleton1 i singleton2 są takie same");
}