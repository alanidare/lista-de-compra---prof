import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import ListaItens from "./components/ListaItens/ListaItens";
import { colors } from "./components/colors";
import { useEffect, useState } from "react";
import { ProdutoItem } from "./interfaces/ProdutoItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE = '@minha_lista_compras';


export default function App() {

   const [lista, setLista] = useState<ProdutoItem[]>([]);
      const [produto, setProduto] = useState("");
        const [carregado, setCarregado] = useState(false);


       useEffect(() => {
    async function carregar() {
      try {
        const salvas = await AsyncStorage.getItem(CHAVE);
         if (salvas) setLista(JSON.parse(salvas));
      } catch (e) {
        console.log('Falha ao carregar a lista :(', e);
      } finally {
        setCarregado(true);
      }
    }
    carregar();
  }, []);

  useEffect(() => {
  if (!carregado) return;
  AsyncStorage.setItem(CHAVE, JSON.stringify(lista)).catch((e) =>
    console.log("Falha ao salvar a lista :(", e)
  );
}, [lista, carregado]);
  
  
  
    function adicionarProduto() {
      const nome = produto.trim();
      if (nome === " ") {
        return;
      }
     
  
    const novoProduto: ProdutoItem = {
      id: crypto.randomUUID(),
      nome: produto,
      comprado: false,
    };

    setLista([...lista, novoProduto]);
    setProduto("");
  
    const novaLista = [...lista, novoProduto];
      setLista(novaLista);
      setProduto('');
    }

    function remover(id: string){
     setLista (lista.filter((item) => item.id !== id));
     
      }

    function mudarComprado(id: string){
      const novaLista = lista.map((item) => {
        if (item.id ===id){
          return {...item, comprado: !item.comprado};
        }
        return item;
      });
      setLista(novaLista);

      
    }

    function limparComprados(comprados: boolean){
      setLista(lista.filter((item) => item.comprado !== comprados));
    }

    

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" /> 
        <Header />
        <Form adicionarProduto={adicionarProduto} produto={produto} setProduto={setProduto}/> 
        <ListaItens produtos ={lista} remover ={remover} mudarComprado={mudarComprado} limparComprados= {limparComprados} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
