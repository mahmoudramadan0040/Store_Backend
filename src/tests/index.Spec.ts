import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe("TEST basic endpoint Server ",async ()=>{
    it("GET the  / endpoint ",async ()=>{
        const res =await request.get("/");
        
        expect(res.status).toBe(200);
    });
});