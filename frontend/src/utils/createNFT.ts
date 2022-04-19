import { ElementType } from 'react';

export interface IInputConfig {
  as: ElementType | undefined;
  controlId: string;
  key: string;
  text: string;
  type: string;
}

export const inputsConfig: IInputConfig[] = [
  {
    as: 'input',
    controlId: 'asset-name',
    key: 'name',
    text: 'Asset name',
    type: 'text',
  },
  {
    as: 'textarea',
    controlId: 'asset-description',
    key: 'description',
    text: 'Asset description',
    type: 'text',
  },
  {
    as: 'input',
    controlId: 'asset-price',
    key: 'price',
    text: 'Asset price',
    type: 'text',
  },
  {
    as: undefined,
    controlId: 'asset-file',
    key: 'file',
    text: 'File',
    type: 'file',
  },
];
