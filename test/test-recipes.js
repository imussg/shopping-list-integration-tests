const chai = require('chai');  
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Recipes', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('Should list all recipes on GET', function() {
  	return chai.request(app)
  		.get('/recipes')
  		.then(res => {
  			// things about the response in general
  			expect(res).to.have.status(200);
	        expect(res).to.be.json;
	        expect(res.body).to.be.a('array');
	        expect(res.body.length).to.be.at.least(1);
	        // things about response items
	        const expectedKeys = ['name', 'id', 'ingredients'];
	        res.body.forEach(item => {
	        	expect(item).to.be.a('object');
	        	expect(item).to.include.keys(expectedKeys);
	        	expect(item.ingredients).to.be.a('array');
	        });
  		});
  });

  it('Should be able to POST new recipes', function() {
  	const newRecipe = {'name': 'Buttered Toast', 'ingredients': ['butter', 'toast']};
  	return chai.request(app)
  		.post('recipes')
  		.send(newRecipe)
  		.then(res => {
  			expect(res).to.have.status(201);
	        expect(res).to.be.json;
	        expect(res.body).to.be.a('object');
	        expect(res.body).to.include.keys('id', 'name', 'ingredients');
	        expect(res.body.id).to.not.equal(null);
	        expect(res.body.ingredients).to.be.a('array');
	        // assign id to the temp object instantiated above and assert that it is deep equal to the created database object
	        expect(res.body).to.deep.equal(Object.assign(newItem, {id: res.body.id}));
  		});
  });

  it('Should be able to modify recipes already entered into the database with PUT', function() {
  	// TODO: Test PUT
  });

  it('Should be able to delete recipes from the database', function() {
  	// TODO: Test DELETE
  });