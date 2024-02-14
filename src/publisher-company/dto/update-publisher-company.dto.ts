import { PartialType } from '@nestjs/mapped-types';
import { CreatePublisherCompanyDto } from './create-publisher-company.dto';

export class UpdatePublisherCompanyDto extends PartialType(CreatePublisherCompanyDto) {}
