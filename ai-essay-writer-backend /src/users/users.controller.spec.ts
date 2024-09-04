import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

const mockUser = {
  id: 1,
  email: 'test@example.com',
  password: 'password',
  name: 'Test User',
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockUser]),
            findOne: jest.fn().mockResolvedValue(mockUser),
            create: jest.fn().mockResolvedValue(mockUser),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    expect(await controller.findAll()).toEqual([mockUser]);
  });

  it('should return a single user', async () => {
    expect(await controller.findOne('1')).toEqual(mockUser);
  });

  it('should create a user', async () => {
    expect(await controller.create(mockUser as User)).toEqual(mockUser);
  });

  it('should remove a user', async () => {
    expect(await controller.remove('1')).toBeUndefined();
  });
});