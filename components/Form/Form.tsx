import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Check } from "lucide-react";
import { colors } from "../colors";
import { useState } from 'react';
import {ProdutoItem} from "../../interfaces/ProdutoItem";

export default function Form() {

   const [lista, setLista] = useState<ProdutoItem[]>([]);
    const [produto, setProduto] = useState("");
      const [mensagem, setMensagem] = useState('');



  function adicionarProduto() {
    if (produto.trim() === '') {
            setMensagem('Tem que escrever algo >:(');

      return;
    }
   

  const novoProduto: ProdutoItem = {
    id: crypto.randomUUID(),
    nome: produto,
    comprado: false,
  };

  const novaLista = [...lista, novoProduto];
    setLista(novaLista);
    setProduto('');
  }
    
  return (
    <View style={styles.container}>
      <Text style = {styles.title}> Adicione um item à lista ;)</Text>

       <TextInput
        style={styles.input}
        value={produto}
        onChangeText={(texto) => setProduto(texto)}
        placeholder="O que você precisa comprar?"
      />

       {mensagem !== '' && (
        <Text style={styles.message}>{mensagem}</Text>
      )}

                
      <TouchableOpacity
        style={styles.button}
        onPress={() => {}}
        // TODO(aluno): ao tocar, adicionar um novo produto à lista (ex.: chamando uma função recebida via props que atualiza o estado da lista em ListaItens/App).
      >
        <Check color={colors.surface} size={16} />
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}
