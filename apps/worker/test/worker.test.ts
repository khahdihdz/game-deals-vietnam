import {describe,it,expect} from 'vitest';
import worker from '../src/index';
const env:any={ALLOWED_ORIGINS:'https://example.com'};
describe('Worker API',()=>{
 it('health endpoint returns ok',async()=>{const r=await worker.fetch(new Request('https://api.test/api/health',{headers:{origin:'https://example.com'}}),env);expect(r.status).toBe(200);expect((await r.json() as any).ok).toBe(true)});
 it('unknown route returns 404',async()=>{const r=await worker.fetch(new Request('https://api.test/unknown'),env);expect(r.status).toBe(404)});
 it('manual sync requires token',async()=>{const r=await worker.fetch(new Request('https://api.test/api/admin/sync',{method:'POST'}),env);expect(r.status).toBe(401)});
});