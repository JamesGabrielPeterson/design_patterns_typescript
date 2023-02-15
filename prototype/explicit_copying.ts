/**
 * The first problem you encounter with this appraoch is that
 * assigning the value of John as the prototype to Jane doesn't
 * create a new object. It simply stores the reference to the
 * John object instance in the Jane identifier. Because of this, 
 * we need to add a deepCopy method to each class.
 * 
 * The problem with adding deepCopy() is that it becomes increasingly
 * complex the more objects you create that rely on each other. This 
 * will become unmanagable fairly quickly.
 * 
 * (See serialization.ts for better solution)
 */

interface Address 
{
  streetAddress: string;
  city: string;
  country: string;
}

interface Person 
{
  name: string;
  address: Address
}

class Address
{
  constructor(streetAddress: string, city: string, country: string)
  {
    this.streetAddress = streetAddress;
    this.city = city;
    this.country = country;
  }

  deepCopy()
  {
    return new Address(
      this.streetAddress,
      this.city,
      this.country
    );
  }

  toString()
  {
    return `Address: ${this.streetAddress}, ${this.city}, ${this.country}`;
  }
}

class Person 
{
  constructor(name: string, address: Address)
  {
    this.name = name;
    this.address = address;
  }

  deepCopy()
  {
    return new Person(
      this.name,
      this.address.deepCopy()
    );
  }

  toString()
  {
    return `${this.name} lives at ${this.address}`;
  }
}

let john = new Person('John', 
  new Address('123 Main Street', 'Rocky Hill', 'United States'));

  let jane = john.deepCopy();

  jane.name = 'Jane';
  jane.address.streetAddress = '321 Board Street';

  console.log(john.toString());
  console.log(jane.toString());