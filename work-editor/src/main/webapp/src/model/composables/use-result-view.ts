import { ref } from "vue";


const showFlag = ref<boolean>(false);
let schoolCountSymbol = Symbol("no meaning symbol");
let regionCountSymbol = Symbol("no meaning symbol");
let maleCountSymbol = Symbol("no meaning symbol");
let femaleCountSymbol = Symbol("no meaning symbol");
let resultsSymbol = Symbol("no meaning symbol");


export default () =>
{
  const setSchoolCountSymbol = (sym: symbol) => schoolCountSymbol = sym;
  const getSchoolCountSymbol = () => schoolCountSymbol;

  const setRegionCountSymbol = (sym: symbol) => regionCountSymbol = sym;
  const getRegionCountSymbol = () => regionCountSymbol;

  const setMaleCountSymbol = (sym: symbol) => maleCountSymbol = sym;
  const getMaleCountSymbol = () => maleCountSymbol;

  const setFemaleCountSymbol = (sym: symbol) => femaleCountSymbol = sym;
  const getFemaleCountSymbol = () => femaleCountSymbol;
  
  const setResultsSymbol = (sym: symbol) => resultsSymbol = sym;
  const getResultsSymbol = () => resultsSymbol;

  return { 
    showFlag,
    setSchoolCountSymbol, getSchoolCountSymbol,
    setRegionCountSymbol, getRegionCountSymbol,
    setMaleCountSymbol, getMaleCountSymbol,
    setFemaleCountSymbol, getFemaleCountSymbol,
    setResultsSymbol, getResultsSymbol,
  };
}