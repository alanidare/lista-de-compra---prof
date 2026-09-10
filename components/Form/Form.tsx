import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Check } from "lucide-react";
import { colors } from "../colors";
import { useState } from 'react';
import {ProdutoItem} from "../../interfaces/ProdutoItem";

interface FormProps{
  produto: string;
  setProduto: (produto: string) => void; 
  adicionarProduto: () => void;
}

export default function Form({produto, setProduto, adicionarProduto}: FormProps) {

  
    
  return (
    <View style={styles.container}>
      <Text> Adicione um item à lista ;)</Text>

       <TextInput
        style={styles.input}
        value={produto}
        onChangeText={(texto) => setProduto(texto)}
        placeholder="O que você precisa comprar?"
      />

      

                
      <TouchableOpacity
        style={styles.button}
        onPress={() => {adicionarProduto()}}
        // TODO(aluno): ao tocar, adicionar um novo produto à lista (ex.: chamando uma função recebida via props que atualiza o estado da lista em ListaItens/App).
      >
        <Check color={colors.surface} size={16} />
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  
}
