import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

// dados de exemplo, mas precisa iniciar vazio

export default function App() {
  const [data, setData] = useState([]);
  const [task, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (task === '') {
      return;
    }
    const novaTarefa = [...data, task];
    setData(novaTarefa);
    setNovaTarefa('');
  };

  const remover = (indice) => {
    const novaTarefa = [...data];
    novaTarefa.splice(indice, 1);
    setData(novaTarefa);
  };

  const alterar = (indice, novaDescricao) => {
    const novaTarefa = [...data];
    novaTarefa[indice] = novaDescricao;
    setData(novaTarefa);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo List</Text>

      <View style={styles.containerInput}>
        <View style={styles.inputText}>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setNovaTarefa(texto)}
            value={task}
          />
          <TouchableOpacity onPress={() => adicionarTarefa()}>
            <Entypo name="circle-with-plus" size={28} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.tarefa}>
            <Text style={styles.textoTarefa}>{item}</Text>
            <TouchableOpacity onPress={() => alterar(index, prompt('Nova Descrição:'))}>
              <Entypo name="pencil" size={28} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => remover(index)}>
              <Entypo name="trash" size={28} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '15%',
    padding: 8,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 6,
    width: '90%',
  },
  containerInput: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
  },
  tarefa: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '90%',
  },
  textoTarefa: {
    fontSize: 18,
  },
});