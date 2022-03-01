const createServer = require('./createServer');
const MathBasic = require('./MathBasic');
const FigureCalculator = require('./FigureCalculator');
const { server } = require('@hapi/hapi');

describe('A HTTP Server', () => {
  const figureCalculator = new FigureCalculator(MathBasic);

  describe('when GET /add', () => {
    it('should respond with a status code of 200 and the payload value is addition result of a and b correctly', async () => {
      // Arrange
      const a = 10;
      const b = 20;
      const spyAdd = jest.spyOn(MathBasic, 'add');
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/add/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(30);
      expect(spyAdd).toBeCalledWith(a, b);
    });
  });

  describe('when GET /subtract', () => {
    it('should respond with a status code of 200 and the payload value is subtraction result of a and b correctly', async () => {
      // Arrange
      const a = 20;
      const b = 10;
      const spySubstract = jest.spyOn(MathBasic, 'subtract');
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/subtract/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(10);
      expect(spySubstract).toBeCalledWith(a, b);
    });
  });

  describe('when GET /multiply', () => {
    it('should respond with a status code of 200 and the payload value is multiply result of a and b correctly', async () => {
      // Arrange
      const a = 10;
      const b = 20;
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/multiply/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(200);
      expect(spyMultiply).toBeCalledWith(a, b);
    });
  });

  describe('when GET /divide', () => {
    it('should respond with a status code of 200 and the payload value is divide result of a and b correctly', async () => {
      // Arrange
      const a = 20;
      const b = 10;
      const spyDivide = jest.spyOn(MathBasic, 'divide');
      const server = createServer({ mathBasic: MathBasic });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/divide/${a}/${b}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(2);
      expect(spyDivide).toBeCalledWith(a, b);
    });
  });

  describe('when GET /rectangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is result of rectangle permiter formula', async () => {
      // Arrange
      const length = 10;
      const width = 10;
      const spyAdd = jest.spyOn(MathBasic, 'add');
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const server = createServer({ mathBasic: MathBasic, figureCalculator });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/perimeter/${length}/${width}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(40);
      expect(spyAdd).toBeCalledWith(length, width);
      expect(spyMultiply).toBeCalledWith(2, 20);
    });
  });

  describe('when GET /rectangle/area', () => {
    it('should respond with a status code of 200 and the payload value is result of rectangle area formula', async () => {
      // Arrange
      const lenght = 10;
      const width = 10;
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const server = createServer({ mathBasic: MathBasic, figureCalculator });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/area/${lenght}/${width}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(100);
      expect(spyMultiply).toBeCalledWith(lenght, width);
    });
  });

  describe('when GET /triangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is result of triangle perimeter formula', async () => {
      // Arrange
      const sideA = 10;
      const sideB = 2;
      const base = 3;
      const spyAdd = jest.spyOn(MathBasic, 'add');
      const server = createServer({ mathBasic: MathBasic, figureCalculator });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/triangle/perimeter/${sideA}/${sideB}/${base}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(15);
      expect(spyAdd).toBeCalledWith(sideA, sideB);
      expect(spyAdd).toBeCalledWith(12, base);
    });
  });

  describe('when GET /triangle/area', () => {
    it('should respond with a status code of 200 and the payload value is result of triangle area formula', async () => {
      // Arrange
      const base = 10;
      const height = 2;
      const spyMultiply = jest.spyOn(MathBasic, 'multiply');
      const spyDivide = jest.spyOn(MathBasic, 'divide');
      const server = createServer({ mathBasic: MathBasic, figureCalculator });

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/triangle/area/${base}/${height}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.value).toEqual(10);
      expect(spyMultiply).toBeCalledWith(base, height);
      expect(spyDivide).toBeCalledWith(20, 2);
    });
  });
});
