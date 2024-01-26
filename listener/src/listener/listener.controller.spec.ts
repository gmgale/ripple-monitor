import { Test, TestingModule } from '@nestjs/testing';
import { ListenerController } from './listener.controller';

describe('ListenerController', () => {
  let controller: ListenerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListenerController],
    }).compile();

    controller = module.get<ListenerController>(ListenerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
