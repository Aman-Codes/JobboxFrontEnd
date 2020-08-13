import React from 'react';
import { Page, Text, Image,Font, View, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
    <PDFViewer>
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>  En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. El resto della concluían sayo de velarte, calzas de velludo para las fiestas con sus pantuflos de lo mismo, los días de entre semana se honraba con su vellori de lo más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años, era de complexión recia, seco de carnes, enjuto de rostro; gran madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada o Quesada (que en esto hay alguna diferencia en los autores que deste caso escriben), aunque por conjeturas verosímiles se deja entender que se llama Quijana; pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verd
      </Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
    </PDFViewer>

);



// const MyDoc = () => (
//     <PDFViewer>
//   <Document>
//     <Page>
//     </Page>
//   </Document>
//     </PDFViewer>

// )

// const ProfilePdf = () => (
//   <div>
//     <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
//       {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
//     </PDFDownloadLink>
//   </div>
// )
  
//   ReactPDF.render(<Quixote />);

// ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
export default MyDocument;