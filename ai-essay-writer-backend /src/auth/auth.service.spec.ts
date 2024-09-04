import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

const mockUser = {
  id: 1,
  email: 'test@example.com',
  password: bcrypt.hashSync('password', 10),
  name: 'Test User',
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a user', async () => {
    const result = await service.validateUser('test@example.com', 'password');
    expect(result).toEqual({ id: 1, email: 'test@example.com', name: 'Test User' });
  });

  it('should return null if user validation fails', async () => {
    jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);
    const result = await service.validateUser('test@example.com', 'password');
    expect(result).toBeNull();
  });

  it('should login a user', async () => {
    const result = await service.login(mockUser);
    expect(result).toEqual({ access_token: 'token' });
  });
});