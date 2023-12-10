/*
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { AuthController } from './auth.controller';

mockAuthControllerRequest: () => {
	let req: Request
	req.body = jest.fn().mockReturnValue(req)
	return req
}

mockAuthControllerResponse: () => {
	let res: Response
	res.send = jest.fn().mockReturnValue(res)
	res.status = jest.fn().mockReturnValue(res)
	res.json = jest.fn().mockReturnValue(res)
	return res
}

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('회원가입', () => {
		expect(controller).toBeDefined();
	});
});
*/