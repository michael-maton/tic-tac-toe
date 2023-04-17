import { View, TouchableOpacity } from 'react-native';
import React, { ReactElement } from 'react';
import Text from '../text/text';
import { BoardState, BoardResult } from '@utils';
import BoardLine from './board-line';

type BoardProps = {
  state: BoardState;
  size: number;
  gameResult?: BoardResult | false;
  disabled?: boolean;
  onCellPressed: (idx: number) => void;
};

export default function Board({
  state,
  size,
  disabled,
  gameResult,
  onCellPressed
}: BoardProps): ReactElement {
  return (
    <View
      style={{
        width: size,
        height: size,
        // backgroundColor: 'green',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}
    >
      {state.map((cell, idx) => {
        return (
          <TouchableOpacity
            disabled={cell !== null || disabled}
            onPress={() => onCellPressed && onCellPressed(idx)}
            style={{
              width: '33.33333%',
              height: '33.33333%',
              // backgroundColor: '#fff',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            key={idx}
          >
            <Text
              style={{
                fontSize: size / 8
              }}
            >
              {cell}
            </Text>
          </TouchableOpacity>
        );
      })}
      {/* {true && (
        <BoardLine size={size} gameResult={{ winner: 'o', diagonal: 'MAIN', direction: 'D' }} />
      )} */}
      {gameResult && <BoardLine size={size} gameResult={gameResult} />}
    </View>
  );
}
