import React from 'react';
import { Subscribe } from 'unstated';
import NewContainer from './NewContainer';
import { Form, Field } from 'react-final-form';
import Character, { makeCharacter } from '../../models/Character';
import ErrorMessage from '../ErrorMessage';
import AppContainer from '../AppContainer';
import currentUser from '../../currentUser';
import styled from 'styled-components';
import { d } from '../../util';
import dice from '../../dice';

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const AbilityCol = styled(Col)`
  input {
    width: 2rem;
  }
`;

const SexRow = styled(Row)`
  input {
    width: 4rem;
  }
`;

interface Props {
  c: NewContainer;
  app: typeof AppContainer;
}

const FT = ({ name }: { name: string }) => (
  <div>
    <label>{name}</label>
    <Field type="text" name={name} component="input" />
    <ErrorMessage name={name} />
  </div>
);

const FN = ({ name }: { name: string }) => (
  <div>
    <label>{name}</label>
    <Field type="number" name={name} component="input" />
    <ErrorMessage name={name} />
  </div>
);

class New extends React.Component<Props> {
  public render() {
    return (
      <Form
        initialValues={makeCharacter()}
        onSubmit={this.handleSubmit}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <Col>
              <Row>
                <Col>
                  {FT({ name: '探索者名' })}
                  {FT({ name: '職業' })}
                  {FT({ name: '学校学位' })}
                  {FT({ name: '出身' })}
                  {FT({ name: '精神的な障害' })}
                  <SexRow>
                    {FT({ name: '性別' })}
                    {FT({ name: '年齢' })}
                  </SexRow>
                </Col>
                <AbilityCol>
                  <Row>
                    {FN({ name: 'STR' })}
                    {FN({ name: 'DEX' })}
                    {FN({ name: 'INT' })}
                    {FN({ name: 'アイデア' })}
                  </Row>
                  <Row>
                    {FN({ name: 'CON' })}
                    {FN({ name: 'APP' })}
                    {FN({ name: 'POW' })}
                    {FN({ name: '幸運' })}
                  </Row>
                  <Row>
                    {FN({ name: 'SIZ' })}
                    {FN({ name: 'SAN' })}
                    {FN({ name: 'EDU' })}
                    {FN({ name: '知識' })}
                  </Row>
                  <Row>
                    {FN({ name: '最大正気度' })}
                    {FN({ name: 'ダメージボーナス' })}
                  </Row>
                </AbilityCol>
              </Row>
              <Row>
                {FN({ name: '正気度ポイント' })}
                {FN({ name: 'マジックポイント' })}
                {FN({ name: '耐久力' })}
              </Row>
            </Col>
            <div>
              <button onClick={this.handleInitialize(props)}>初期化</button>
              <button>作る</button>
            </div>
            <div>{d(props.values)}</div>
          </form>
        )}
      />
    );
  }

  private handleInitialize = props => {
    return event => {
      event.preventDefault();
      const { batch, change } = props.form;
      batch(() => {
        const STR = dice.roll3D6();
        change('STR', STR);
        const CON = dice.roll3D6();
        change('CON', CON);
        const POW = dice.roll3D6();
        change('POW', POW);
        change('DEX', dice.roll3D6());
        change('APP', dice.roll3D6());
        const INT = dice.roll2D6() + 6;
        change('INT', INT);
        const SIZ = dice.roll2D6() + 6;
        change('SIZ', SIZ);
        const EDU = dice.roll3D6() + 3;
        change('EDU', EDU);
        const SAN = POW * 5;
        change('SAN', SAN);
        change('アイデア', INT * 5);
        change('幸運', POW * 5);
        change('知識', EDU * 5);
        change('ダメージボーナス', this.computeDamageBonus(STR, SIZ));
        change('最大正気度', 99);
        change('正気度ポイント', SAN);
        change('マジックポイント', POW);
        change('耐久力', Math.ceil((CON + SIZ) / 2));
      });
    };
  };

  private computeDamageBonus(STR: number, SIZ: number): number {
    const value = STR + SIZ;
    if (value <= 12) {
      return -dice.roll1D6();
    }
    if (value <= 16) {
      return -dice.roll1D4();
    }
    if (value <= 24) {
      return 0;
    }
    if (value <= 32) {
      return dice.roll1D4();
    }
    if (value <= 40) {
      return dice.roll1D6();
    }
    if (value <= 56) {
      return dice.roll2D6();
    }
    if (value <= 72) {
      return dice.roll3D6();
    }
    if (value <= 88) {
      return dice.roll4D6();
    }
    let result = dice.roll4D6();
    for (let i = value - 88; i > 0; i - 16) {
      result += dice.roll1D6();
    }
    return result;
  }

  private handleSubmit = async (values: object) => {
    console.log(values);
    const character = {
      ...(values as Character),
      uid: currentUser().uid
    };
    await this.props.c.create(character);
  };
}

export default () => (
  <Subscribe to={[NewContainer, AppContainer]}>
    {(c: NewContainer, app: typeof AppContainer) => <New {...{ c, app }} />}
  </Subscribe>
);
