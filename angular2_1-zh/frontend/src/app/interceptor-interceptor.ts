import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {

  let request = req

  if(req.method === 'GET'){
    console.log("GET: " + req)
  }

  if(req.method === 'POST'){
    console.log("POST: " + req)
  }


  return next(req);
};
