'use client'

import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { IResourceData } from './types/interface'


const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
})

export default function PDF({ data }: { data: IResourceData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.text}>Name: {data.title}</Text>
          <Text style={styles.text}>description: {data.description}</Text>
          <Text style={styles.text}>date: {data.date}</Text>
          <Text style={styles.text}>size: {data.size}</Text>
        </View>
      </Page>
    </Document>
  )
}