import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';

const mockUser = {
  id: 1,
  email: 'test@example.com',
  password: 'password',
  name: 'Test User',
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = plainToClass(CreateUserDto, {
      email: 'test@example.com',
      password: 'password',
      name: 'Test User',
    });
    jest.spyOn(repository, 'create').mockReturnValue(mockUser as User);
    jest.spyOn(repository, 'save').mockResolvedValue(mockUser as User);
    expect(await service.create(createUserDto)).toEqual(mockUser);
  });

  it('should find a user by id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser as User);
    expect(await service.findOne(1)).toEqual(mockUser);
  });

  it('should find all users', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([mockUser] as User[]);
    expect(await service.findAll()).toEqual([mockUser]);
  });

  it('should remove a user', async () => {
    const deleteResult: DeleteResult = { raw: [], affected: 1 };
    jest.spyOn(repository, 'delete').mockResolvedValue(deleteResult);
    expect(await service.remove(1)).toBeUndefined();
  });
});