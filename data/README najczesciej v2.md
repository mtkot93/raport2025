# Analiza Średniego Czasu Oczekiwania na Połączenie - wersja 2

## Opis procesu

### 1. Założenia analizy
Na podstawie wniosków z analizy charakterystyki danych (`memorybank/data_characteristics.md`), zastosowano następujące filtry:

- **Tylko dni robocze** (poniedziałek-piątek) - wykluczenie weekendów
- **Tylko godziny dzienne** (6:00-22:00) - wykluczenie godzin nocnych z ekstremalnie długimi czasami oczekiwania
- **Podział na miasta/regiony** - osobna analiza dla każdego regionu
- **Zastosowanie metody MAD** do identyfikacji outlierów

### 2. Proces przetwarzania danych

1. **Wczytanie danych**: 304,581 rekordów z pliku `jd_report_route_10.csv`
2. **Filtrowanie dni roboczych**: 302,281 rekordów (98.7%)
3. **Filtrowanie godzin dziennych**: 259,793 rekordów (85.9% dni roboczych)
4. **Usunięcie braków danych**: 255,785 rekordów do analizy

### 3. Metodologia

#### Statystyki obliczone dla każdego regionu:
- **Średnia** - mniej reprezentatywna ze względu na skośność rozkładu
- **Mediana** - bardziej odporna na outliers, lepsza miara tendencji centralnej
- **Odchylenie standardowe** - miara rozproszenia
- **Minimum i maksimum** - zakres wartości
- **Percentyle** (P25, P75, P90, P95) - rozkład wartości
- **Liczba i procent outlierów** (metoda MAD z progiem 3.5)

#### Metoda MAD (Median Absolute Deviation):
- Odporna na skośny rozkład danych
- Threshold = 3.5 (standardowa wartość)
- Skalowanie MAD: 1.4826 * MAD (normalizacja do odchylenia standardowego)

## Kluczowe wnioski

### 1. Różnica między średnią a medianą
Wszystkie miasta wykazują znaczącą różnicę między średnią a medianą (2-3.5 minuty), co potwierdza silnie prawostronnie skośny rozkład czasów oczekiwania.

### 2. Ranking miast (według mediany czasu oczekiwania):
1. **Kraków** - 4.0 min (najkrótszy czas)
2. **Wrocław** - 4.0 min
3. **Warszawa** - 5.0 min
4. **Poznań** - 5.0 min
5. **Trójmiasto** - 5.0 min
6. **Bydgoszcz** - 5.0 min
7. **Szczecin** - 5.0 min
8. **GOP** - 6.0 min
9. **Lublin** - 6.0 min
10. **Łódź** - 6.0 min

### 3. Miasta z największą zmiennością
- **GOP** - największa różnica średnia-mediana (3.52 min)
- **Bydgoszcz** - druga największa różnica (3.22 min)
- Sugeruje to większą nieprzewidywalność czasów oczekiwania w tych regionach

### 4. Outliers
- **Warszawa** - najwyższy procent outlierów (5.77%)
- **Szczecin** - najniższy procent outlierów (2.53%)
- Średnio około 4-5% połączeń ma nietypowo długie czasy oczekiwania

### 5. Percentyl 90 (P90)
- Większość miast: 13-17 minut
- **GOP**: 22 minuty (najdłuższy czas)
- P90 pokazuje, że 90% połączeń ma czas oczekiwania krótszy niż te wartości

## Rekomendacje

1. **Używać mediany** jako głównego wskaźnika - jest bardziej reprezentatywna dla typowego doświadczenia użytkownika

2. **Raportować przedziały** - oprócz wartości centralnej pokazywać P25-P75 lub P10-P90

3. **Analizować osobno** każde miasto ze względu na lokalne różnice w systemach transportowych

4. **Monitorować outliers** - szczególnie w Warszawie, gdzie jest ich najwięcej

5. **Rozważyć dodatkowe metryki**:
   - Procent połączeń z czasem oczekiwania < 5 min
   - Procent połączeń z czasem oczekiwania > 15 min
   - Analiza według typów transportu

## Pliki wygenerowane

- `sredni_czas_oczekiwania_v2.csv` - pełne wyniki analizy dla wszystkich 36 regionów
- `analyze_wait_times_v2.py` - skrypt przeprowadzający analizę
- `check_columns.py` - pomocniczy skrypt do sprawdzenia struktury danych 