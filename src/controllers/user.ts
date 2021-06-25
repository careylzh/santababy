interface VerifyResponse {
  message: string;
}

interface RedeemResponse {
  message: string;
}

export default class UserController {
  //verify() should be a post method which uses the typeORM method find
  public async verify(): Promise<VerifyResponse> {
    return {
      message:
        "express server currently access the subrouter in /src/routes to access the controller, which contains the GET method verify  ",
    };
  }
}
