/*
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpRequest } from './dto/request';
import { UserEntity } from './model/user.model';
import { bcrypt } from 'bcrypt';

const mockAuthService = {
	signUp: jest.fn(async (request) => {
		const { userName, userEmail, userPassword, userDepartment } = request

        const isExistEmail = await this.userRepository.findOneBy({ userEmail })
        if (isExistEmail) throw new ConflictException()

        const hashedPassword = await bcrypt.getSalt(process.env.SALTROUNDS, (err, salt) => {
            bcrypt.hash(userPassword, salt, async (err, hash) => {
                await this.userRepository.save({
                    userName,
                    userPassword: hashedPassword,
                    userEmail,
                    userDepartment
                })
            })
        })

        return null
	}),
	signIn: jest.fn(),
}
const mockJwtService = {
	sign: jest.fn()
}

describe('AuthService', () => {
	let authService: AuthService
	// let jwtService: JwtService
	let user
	
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{ provide: AuthService, useValue: mockAuthService },
				// { provide: JwtService, useValue: mockJwtService }
			],
		}).compile()

		authService = module.get<AuthService>(AuthService)

		// jwtService = module.get<JwtService>(JwtService)
		user = {
			userId: 1,
			userName: 'test',
			userEmail: 'test',
			userPassword: '1234asDf!',
			userDepartment: '테스팅부'
		}
	})

	describe('signIn', () => {
		it('회원가입 성공', async () => {
			expect(await mockAuthService.signUp(user)).toEqual(null)
		})
	})
})
*/