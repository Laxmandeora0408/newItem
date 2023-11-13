const { faker } = require('@faker-js/faker');


let randomDetails = () =>{
  return{
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    image: {
      filename: faker.system.commonFileName(),
      url: faker.image.imageUrl(),
    },
    price: faker.commerce.price(),
    location: faker.address.city(),
    country: faker.address.country(),
  };
}
const sampleListings = [];
for(let i =0;i<1000;i++){
  sampleListings.push(randomDetails());
  console.log(sampleListings);
}

module.exports= {data:sampleListings};