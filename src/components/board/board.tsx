import { View, TouchableOpacity } from 'react-native';
import React, { ReactElement } from 'react';
import Text from '../text/text';
import { BoardState, BoardResult } from '@utils';
import BoardLine from './board-line';
import styles from './board.styles';

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
      style={[
        styles.board,
        {
          width: size,
          height: size
        }
      ]}
    >
      {state.map((cell, idx) => {
        return (
          <TouchableOpacity
            disabled={cell !== null || disabled}
            onPress={() => onCellPressed && onCellPressed(idx)}
            style={[styles.cell, styles[`cell${idx}` as 'cell']]}
            key={idx}
          >
            <Text style={[styles.cellText, { fontSize: size / 4 }]}>{cell}</Text>
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
