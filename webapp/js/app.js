// Konfiguracja wskaźników
const indicators = {
    home: {
        title: 'Analiza Wskaźników Transportowych',
        description: [
            'Wybierz wskaźnik z menu powyżej, aby zobaczyć szczegółową analizę jakości transportu publicznego w różnych regionach Polski.',
            'Analiza opiera się na danych z raportu Jakdojade i obejmuje 35 regionów kraju.',
            'Każdy wskaźnik przedstawia inny aspekt jakości transportu publicznego - od częstotliwości po koszty.'
        ],
        methodology: `
            <p>Szczegółowy opis metodologii zostanie wyświetlony po wybraniu konkretnego wskaźnika.</p>
            <p>Ogólna metodologia projektu obejmuje analizę danych transportowych z raportu Jakdojade dla 35 regionów Polski.</p>
            <h4>Źródła danych:</h4>
            <ul>
                <li><strong>jd_report_route_10.csv</strong> - główne dane o trasach z raportu Jakdojade</li>
                <li><strong>lista_miast_regionow.csv</strong> - dane o populacji regionów z 2021 roku</li>
            </ul>
            <p>Każdy wskaźnik jest analizowany osobno z uwzględnieniem statystyk opisowych, wartości odstających i porównań między regionami.</p>
        `,
        chart1Title: 'Wykres 1',
        chart2Title: 'Wykres 2',
        tableTitle: 'Dane',
        dataFile: null
    },
    najczesciej: {
        title: 'Najczęściej - Czasy Oczekiwania na Transport',
        description: [
            'Analiza średnich czasów oczekiwania na transport publiczny w różnych regionach Polski.',
            'Wskaźnik pokazuje, jak długo użytkownicy muszą czekać na przyjazd środka transportu.',
            'Niższe wartości oznaczają lepszą częstotliwość połączeń i dostępność transportu publicznego.'
        ],
        methodology: `
            <h4>Metodologia analizy średniego czasu oczekiwania na połączenie - wersja 2</h4>
            
            <h5>1. Cel badania</h5>
            <p>Analiza ma na celu określenie efektywności systemów transportu publicznego poprzez pomiar średnich czasów oczekiwania na transport w różnych regionach Polski. Wskaźnik mierzy faktyczny czas, jaki użytkownicy muszą czekać na przyjazd środka transportu.</p>
            
            <h5>2. Źródła danych</h5>
            <ul>
                <li><strong>Dane podstawowe:</strong> <code>jd_report_route_10.csv</code> - 304,581 rekordów z raportu Jakdojade</li>
                <li><strong>Kolumna analizowana:</strong> <code>departure_wait_time_minutes</code> - czas oczekiwania na transport</li>
                <li><strong>Dane pomocnicze:</strong> <code>lista_miast_regionow.csv</code> - informacje o populacji regionów</li>
            </ul>
            
            <h5>3. Proces filtrowania i przetwarzania danych</h5>
            <ol>
                <li><strong>Filtrowanie czasowe:</strong> Tylko dni robocze (poniedziałek-piątek) - 302,281 rekordów (98.7%)</li>
                <li><strong>Filtrowanie godzinowe:</strong> Tylko godziny dzienne (6:00-22:00) - 259,793 rekordów (85.9%)</li>
                <li><strong>Usunięcie braków danych:</strong> Pozostało 255,785 rekordów do analizy</li>
                <li><strong>Wykrywanie outlierów:</strong> Metoda MAD (Median Absolute Deviation) z progiem 3.5</li>
            </ol>
            
            <h5>4. Zastosowane metody statystyczne</h5>
            <ul>
                <li><strong>Metoda MAD:</strong> Skalowanie: 1.4826 × MAD (normalizacja do odchylenia standardowego)</li>
                <li><strong>Statystyki opisowe:</strong> Średnia, mediana, odchylenie standardowe, percentyle (P25, P75, P90, P95)</li>
                <li><strong>Analiza rozkładu:</strong> Identyfikacja prawostronnej skośności rozkładu czasów oczekiwania</li>
            </ul>
            
            <h5>5. Definicje wskaźników</h5>
            <ul>
                <li><strong>Mediana</strong> - główny wskaźnik oceny (bardziej odporny na outliers niż średnia)</li>
                <li><strong>Różnica średnia-mediana</strong> - miara skośności rozkładu (2-3.5 min wskazuje na prawostronną skośność)</li>
                <li><strong>Procent outlierów</strong> - udział połączeń z nietypowo długimi czasami oczekiwania</li>
            </ul>
            
            <h5>6. Ograniczenia i założenia</h5>
            <ul>
                <li>Analiza ograniczona do dni roboczych i godzin dziennych</li>
                <li>Zastosowanie mediany jako głównego wskaźnika ze względu na skośność rozkładu</li>
                <li>Outliers (4-5% połączeń) mogą wskazywać na problemy systemowe</li>
                <li>Różnice regionalne wynikają z lokalnych systemów transportowych</li>
            </ul>
        `,
        chart1Title: 'Średnie czasy oczekiwania według regionów',
        chart2Title: 'Rozkład czasów oczekiwania według regionu',
        tableTitle: 'Podsumowanie',
        dataFile: 'najczesciej_v2.json'
    },
    najmniej_chodzenia: {
        title: 'Najmniej Chodzenia - Dystanse Piesze',
        description: [
            'Analiza średnich dystansów pieszych w podróżach transportem publicznym.',
            'Wskaźnik mierzy długość tras pieszych do i z przystanków transportu publicznego.',
            'Niższe wartości oznaczają lepszą dostępność przystanków i mniejszy wysiłek pieszych przemieszczeń.'
        ],
        methodology: `
            <h4>Metodologia analizy wskaźnika "najmniej chodzenia"</h4>
            
            <h5>1. Cel badania</h5>
            <p>Analiza ma na celu ocenę dostępności transportu publicznego poprzez pomiar średniej długości odcinków pieszych w podróżach. Wskaźnik ocenia, jak efektywnie rozmieszczone są przystanki i jak minimalizowany jest wysiłek pieszego przemieszczania się użytkowników.</p>
            
            <h5>2. Źródła danych</h5>
            <ul>
                <li><strong>Dane podstawowe:</strong> <code>jd_report_route_10.csv</code> - 304,581 rekordów z raportu Jakdojade</li>
                <li><strong>Kolumny analizowane:</strong> 
                    <ul>
                        <li><code>transfers_walk_length_meters</code> - długość chodzenia podczas przesiadek</li>
                        <li><code>edge_stops_walk_length_meters</code> - długość dojścia do/z przystanków</li>
                    </ul>
                </li>
                <li><strong>Dane pomocnicze:</strong> <code>lista_miast_regionow.csv</code> - informacje o populacji regionów</li>
            </ul>
            
            <h5>3. Proces filtrowania i przetwarzania danych</h5>
            <ol>
                <li><strong>Obliczenie całkowitej długości chodzenia:</strong> suma przesiadek i dojść do przystanków</li>
                <li><strong>Filtrowanie rekordów:</strong> Tylko trasy z chodzeniem > 0 metrów - 239,508 rekordów (78.6%)</li>
                <li><strong>Wykluczono:</strong> 65,073 rekordów (21.4%) bez danych o chodzeniu</li>
                <li><strong>Agregacja:</strong> Według regionów i typów transportu</li>
            </ol>
            
            <h5>4. Wzór obliczeniowy</h5>
            <p><strong>Całkowita długość chodzenia</strong> = transfers_walk_length_meters + edge_stops_walk_length_meters</p>
            <p><strong>Średnia długość chodzenia</strong> = suma(długość chodzenia) / liczba tras z chodzeniem > 0</p>
            
            <h5>5. Zastosowane metody statystyczne</h5>
            <ul>
                <li><strong>Statystyki opisowe:</strong> Średnia, mediana, minimum, maksimum</li>
                <li><strong>Ranking:</strong> Sortowanie rosnąco według średniej długości chodzenia</li>
                <li><strong>Analiza według typów transportu:</strong> Porównanie efektywności różnych środków transportu</li>
            </ul>
            
            <h5>6. Jednostki i interpretacja</h5>
            <ul>
                <li><strong>Jednostka:</strong> Metry (m)</li>
                <li><strong>Optymalne wartości:</strong> Poniżej 500 metrów (zgodnie z standardami dostępności)</li>
                <li><strong>Interpretacja:</strong> Niższe wartości = lepsza dostępność transportu publicznego</li>
                <li><strong>Benchmark:</strong> Średnia ogólna 553.3 metra, mediana 480.0 metrów</li>
            </ul>
            
            <h5>7. Ograniczenia i założenia</h5>
            <ul>
                <li>21.4% rekordów nie zawiera danych o chodzeniu</li>
                <li>Różna reprezentacja regionów (od 19 do 61,179 tras)</li>
                <li>Brak normalizacji względem wielkości miast</li>
                <li>Nie uwzględnia barier architektonicznych i topografii terenu</li>
            </ul>
        `,
        chart1Title: 'Średnie dystanse piesze według regionów',
        chart2Title: 'Porównanie dostępności przystanków',
        tableTitle: 'Statystyki dystansów pieszych',
        dataFile: 'najmniej_chodzenia.json'
    },
    najmniej_czekania: {
        title: 'Najmniej Czekania - Czasy Oczekiwania na Odjazd',
        description: [
            'Analiza czasów oczekiwania na odjazd środków transportu publicznego.',
            'Wskaźnik różni się od "Najczęściej" - mierzy czas od przyjścia na przystanek do odjazdu pojazdu.',
            'Krótsze czasy oczekiwania wskazują na lepszą synchronizację rozkładów jazdy z potrzebami pasażerów.'
        ],
        methodology: `
            <h4>Metodologia analizy wskaźnika "najmniej czekania na odjazd"</h4>
            
            <h5>1. Cel badania</h5>
            <p>Analiza ma na celu ocenę efektywności planowania podróży poprzez pomiar średniego czasu czekania na początek pierwszej trasy względem zadanego czasu wyszukiwania. Wskaźnik mierzy rzeczywiste doświadczenie użytkownika przy planowaniu podróży i pokazuje, jak długo trzeba czekać od momentu chęci rozpoczęcia podróży do rzeczywistego odjazdu.</p>
            
            <h5>2. Źródła danych</h5>
            <ul>
                <li><strong>Dane podstawowe:</strong> <code>jd_report_route_10.csv</code> - 304,581 rekordów z raportu Jakdojade</li>
                <li><strong>Kolumna analizowana:</strong> <code>departure_wait_time_minutes</code> - czas oczekiwania na odjazd z pierwszego przystanku</li>
                <li><strong>Dane pomocnicze:</strong> <code>lista_miast_regionow.csv</code> - informacje o populacji regionów</li>
            </ul>
            
            <h5>3. Proces filtrowania i przetwarzania danych</h5>
            <ol>
                <li><strong>Filtrowanie czasowe:</strong> Tylko dni robocze (poniedziałek-piątek) - 302,281 rekordów (99.2%)</li>
                <li><strong>Filtrowanie godzinowe:</strong> Tylko godziny dzienne (6:00-22:00) - 259,793 rekordów (85.9%)</li>
                <li><strong>Usunięcie braków danych:</strong> Pozostało 255,785 rekordów do analizy</li>
                <li><strong>Wykrywanie outlierów:</strong> Metoda MAD (Median Absolute Deviation) z progiem 3.5</li>
            </ol>
            
            <h5>4. Definicja wskaźnika</h5>
            <p><strong>Czas czekania na odjazd</strong> = czas rozpoczęcia podróży - zadany czas wyszukiwania</p>
            <ul>
                <li><strong>0 minut</strong> = możliwość natychmiastowego odjazdu</li>
                <li><strong>Wyższe wartości</strong> = dłuższe oczekiwanie na pierwszy środek transportu</li>
                <li><strong>Jednostka:</strong> Minuty</li>
            </ul>
            
            <h5>5. Zastosowane metody statystyczne</h5>
            <ul>
                <li><strong>Metoda MAD:</strong> Identyfikacja outlierów (threshold = 3.5)</li>
                <li><strong>Statystyki odporne:</strong> Mediana jako główny wskaźnik</li>
                <li><strong>Percentyle:</strong> P10, P25, P75, P90, P95 - rozkład wartości</li>
                <li><strong>Analiza skośności:</strong> Różnica średnia-mediana jako miara rozkładu</li>
            </ul>
            
            <h5>6. Kluczowe różnice od wskaźnika "Najczęściej"</h5>
            <ul>
                <li><strong>Najczęściej:</strong> Częstotliwość kursowania (co ile minut)</li>
                <li><strong>Najmniej czekania:</strong> Czas do pierwszego odjazdu (jak długo czekać)</li>
                <li><strong>Komplementarność:</strong> Częstotliwość vs rzeczywiste doświadczenie użytkownika</li>
                <li><strong>Planowanie:</strong> Uwzględnia rzeczywiste rozkłady jazdy i synchronizację</li>
            </ul>
            
            <h5>7. Benchmarki i interpretacja</h5>
            <ul>
                <li><strong>Średnia ogólna:</strong> 7.91 min</li>
                <li><strong>Mediana ogólna:</strong> 5.00 min</li>
                <li><strong>50% podróży</strong> rozpoczyna się w ciągu 5 minut</li>
                <li><strong>90% podróży</strong> rozpoczyna się w ciągu 15-20 minut</li>
                <li><strong>Outliers:</strong> Średnio 4-5% połączeń z bardzo długimi czasami czekania</li>
            </ul>
            
            <h5>8. Ograniczenia i założenia</h5>
            <ul>
                <li>Dane historyczne - rzeczywiste czasy mogą się różnić</li>
                <li>Fokus na dniach roboczych - weekendy mogą mieć inne charakterystyki</li>
                <li>Brak kontekstu lokalizacji - czasy mogą się różnić centrum vs peryferia</li>
                <li>Agregacja regionalna - ukrywa różnice wewnątrz miast</li>
            </ul>
        `,
        chart1Title: 'Czasy oczekiwania na odjazd',
        chart2Title: 'Efektywność rozkładów jazdy',
        tableTitle: 'Statystyki oczekiwania na odjazd',
        dataFile: 'najmniej_czekania.json'
    },
    najmniej_przesiadek: {
        title: 'Najmniej Przesiadek - Liczba Przesiadek',
        description: [
            'Analiza średniej liczby przesiadek w trasach transportu publicznego.',
            'Wskaźnik mierzy, ile razy pasażer musi zmienić środek transportu podczas podróży.',
            'Mniejsza liczba przesiadek oznacza wygodniejsze i prostsze podróże.'
        ],
        methodology: `
            <h4>Metodologia analizy:</h4>
            <p>Analiza liczby przesiadek z kolumny <code>number_of_transfers</code>.</p>
            <h4>Interpretacja:</h4>
            <ul>
                <li><strong>0 przesiadek</strong> - podróż bezpośrednia</li>
                <li><strong>1-2 przesiadki</strong> - akceptowalna wygoda</li>
                <li><strong>3+ przesiadek</strong> - skomplikowana trasa</li>
            </ul>
            <h4>Znaczenie dla użytkowników:</h4>
            <p>Mniejsza liczba przesiadek oznacza:</p>
            <ul>
                <li>Krótszy czas podróży</li>
                <li>Mniejsze ryzyko opóźnień</li>
                <li>Większy komfort podróżowania</li>
            </ul>
        `,
        chart1Title: 'Średnia liczba przesiadek według regionów',
        chart2Title: 'Rozkład liczby przesiadek',
        tableTitle: 'Ranking regionów według przesiadek',
        dataFile: 'najmniej_przesiadek.json'
    },
    najpunktualniej: {
        title: 'Najpunktualniej - Punktualność Transportu',
        description: [
            'Analiza punktualności transportu publicznego na podstawie rzeczywistych danych.',
            'Wskaźnik porównuje planowane czasy podróży z rzeczywistymi.',
            'Wyższa punktualność oznacza większą niezawodność systemu transportowego.'
        ],
        methodology: `
            <h4>Metodologia analizy wskaźnika "najpunktualniej"</h4>
            
            <h5>1. Cel badania</h5>
            <p>Analiza ma na celu ocenę rzeczywistej punktualności systemów transportu publicznego poprzez porównanie planowanych czasów podróży z rzeczywistymi opóźnieniami. Wskaźnik mierzy niezawodność i przewidywalność transportu publicznego dla użytkowników.</p>
            
            <h5>2. Źródła danych</h5>
            <ul>
                <li><strong>Dane podstawowe:</strong> <code>jd_report_route_10.csv</code> - 304,581 rekordów z raportu Jakdojade</li>
                <li><strong>Kolumny analizowane:</strong>
                    <ul>
                        <li><code>start_stop_abs_delay_minutes</code> - bezwzględne opóźnienie na przystanku startowym</li>
                        <li><code>target_stop_abs_delay_minutes</code> - bezwzględne opóźnienie na przystanku docelowym</li>
                        <li><code>start_stop_departure_time</code> - czas odjazdu</li>
                    </ul>
                </li>
                <li><strong>Dane pomocnicze:</strong> <code>lista_miast_regionow.csv</code> - informacje o populacji regionów</li>
            </ul>
            
            <h5>3. Proces filtrowania i przetwarzania danych</h5>
            <ol>
                <li><strong>Kompletność danych punktualności:</strong> 190,301 rekordów (62.5% z oryginalnych danych)</li>
                <li><strong>Filtrowanie czasowe:</strong> Tylko dni robocze (pon-pt) - 188,742 rekordów</li>
                <li><strong>Filtrowanie godzinowe:</strong> Tylko godziny dzienne (6:00-22:00) - 162,579 rekordów</li>
                <li><strong>Wykrywanie outlierów:</strong> Metoda MAD (threshold=3.5) - 45,642 outlierów (28.07%)</li>
            </ol>
            
            <h5>4. Wzór obliczeniowy</h5>
            <p><strong>Średnia punktualność</strong> = (|opóźnienie_start| + |opóźnienie_koniec|) / 2</p>
            <ul>
                <li><strong>0.0 min</strong> = transport zgodny z rozkładem (idealna punktualność)</li>
                <li><strong>Wartości > 0</strong> = średnie opóźnienie względem rozkładu</li>
                <li><strong>Jednostka:</strong> Minuty bezwzględnego odchylenia</li>
            </ul>
            
            <h5>5. Zastosowane metody statystyczne</h5>
            <ul>
                <li><strong>Mediana jako główny wskaźnik:</strong> Większość połączeń punktualna (mediana 0.00 min)</li>
                <li><strong>Metoda MAD:</strong> Identyfikacja ekstremalnych opóźnień</li>
                <li><strong>Percentyle:</strong> P90, P95 - analiza skrajnych przypadków</li>
                <li><strong>Analiza asymetrii:</strong> Rozkład prawostronnie skośny (większość punktualna)</li>
            </ul>
            
            <h5>6. Kluczowe benchmarki</h5>
            <ul>
                <li><strong>Średnia ogólna:</strong> 1.10 min bezwzględnej różnicy</li>
                <li><strong>Mediana ogólna:</strong> 0.00 min (większość połączeń punktualna)</li>
                <li><strong>Odchylenie standardowe:</strong> 6.31 min</li>
                <li><strong>Ekstremalne opóźnienia:</strong> Do 487 min (8+ godzin)</li>
                <li><strong>Outliers:</strong> 28.07% rekordów z nietypowymi opóźnieniami</li>
            </ul>
            
            <h5>7. Analiza według typów transportu</h5>
            <ul>
                <li><strong>Metro (SUBWAY):</strong> 0.00 min median, 0.00 min średnia - najlepszy</li>
                <li><strong>Pociągi (TRAIN):</strong> 0.00 min median, 0.07 min średnia - bardzo dobry</li>
                <li><strong>Trolejbusy (TROLLEY_BUS):</strong> 0.00 min median, 0.00 min średnia</li>
                <li><strong>Tramwaje (TRAM):</strong> 0.00 min median, 0.66 min średnia</li>
                <li><strong>Autobusy (BUS):</strong> 0.00 min median, 1.64 min średnia - największe problemy</li>
            </ul>
            
            <h5>8. KRYTYCZNE OGRANICZENIA DANYCH</h5>
            <ul>
                <li><strong>Kompletność:</strong> Tylko 62.5% rekordów ma dane o punktualności</li>
                <li><strong>Reprezentatywność:</strong> Brak danych może oznaczać perfect punktualność lub brak monitoringu</li>
                <li><strong>Różnice regionalne:</strong> Małe miasta - mało danych, duże miasta - więcej problemów</li>
                <li><strong>Kontekst operacyjny:</strong> Brak informacji o przyczynach opóźnień</li>
            </ul>
            
            <h5>9. Interpretacja wyników</h5>
            <p><strong>Transport szynowy vs kołowy:</strong></p>
            <ul>
                <li>Metro i trolejbusy - najwyższa punktualność</li>
                <li>Pociągi - bardzo punktualne (prawdopodobnie regionalne)</li>
                <li>Tramwaje - dobra punktualność miejska</li>
                <li>Autobusy - największa zmienność i problemy z punktualnością</li>
            </ul>
        `,
        chart1Title: 'Punktualność według regionów',
        chart2Title: 'Rozkład opóźnień',
        tableTitle: 'Statystyki punktualności (rzeczywiste dane)',
        dataFile: 'najpunktualniej.json'
    },
    najszybciej: {
        title: 'Najszybciej - Prędkość Podróżowania',
        description: [
            'Analiza średniej prędkości podróżowania transportem publicznym.',
            'Wskaźnik oblicza prędkość na podstawie dystansu i czasu podróży.',
            'Wyższa prędkość oznacza bardziej efektywny system transportowy.'
        ],
        methodology: `
            <h4>Metodologia analizy wskaźnika "najszybciej v2" - bez pociągów</h4>
            
            <h5>1. Cel badania</h5>
            <p>Analiza ma na celu ocenę efektywności transportu miejskiego poprzez pomiar średniej prędkości pojazdów <strong>z wykluczeniem pociągów</strong>. Wskaźnik v2 koncentruje się na rzeczywistej mobilności miejskiej bez wpływu szybkich połączeń kolejowych, które mogą zniekształcać obraz transportu miejskiego.</p>
            
            <h5>2. Źródła danych</h5>
            <ul>
                <li><strong>Dane podstawowe:</strong> <code>jd_report_route_10.csv</code> - 304,581 rekordów z raportu Jakdojade</li>
                <li><strong>Kolumny analizowane:</strong>
                    <ul>
                        <li><code>transport_length_meters</code> - długość trasy w metrach</li>
                        <li><code>transport_time_minutes</code> - czas przejazdu w minutach</li>
                        <li><code>transport_type</code> - typ środka transportu</li>
            </ul>
                </li>
                <li><strong>Dane pomocnicze:</strong> <code>lista_miast_regionow.csv</code> - informacje o populacji regionów</li>
            </ul>
            
            <h5>3. Proces filtrowania i przetwarzania danych</h5>
            <ol>
                <li><strong>Wykluczenie pociągów:</strong> Usunięcie 13,251 rekordów typu TRAIN</li>
                <li><strong>Filtrowanie czasowe:</strong> Tylko dni robocze (pon-pt) - 289,221 rekordów</li>
                <li><strong>Filtrowanie godzinowe:</strong> Tylko godziny dzienne (6:00-22:00) - 248,964 rekordów</li>
                <li><strong>Usunięcie braków danych:</strong> Kompletne dane o długości i czasie - 248,885 rekordów</li>
                <li><strong>Filtrowanie prędkości:</strong> Ograniczenie do ≤ 120 km/h - 248,796 rekordów</li>
            </ol>
            
            <h5>4. Wzór obliczeniowy</h5>
            <p><strong>Średnia prędkość ważona</strong> = Σ(długość tras w km) / Σ(czas przejazdu w godzinach)</p>
            <ul>
                <li><strong>Konwersja jednostek:</strong> Metry → kilometry, minuty → godziny</li>
                <li><strong>Wynik:</strong> Prędkość w km/h</li>
                <li><strong>Metoda ważona:</strong> Uwzględnia rzeczywistą odległość i czas wszystkich przejazdów</li>
            </ul>
            
            <h5>5. Kluczowe różnice względem wersji 1</h5>
            <ul>
                <li><strong>Wersja 1:</strong> Wszystkie środki transportu (304,581 rekordów)</li>
                <li><strong>Wersja 2:</strong> Bez pociągów (248,796 rekordów po filtrach)</li>
                <li><strong>Cel v2:</strong> Analiza czystego transportu miejskiego</li>
                <li><strong>Rezultat:</strong> Bardziej wyrównane wyniki między miastami</li>
            </ul>
            
            <h5>6. Zastosowane metody statystyczne</h5>
            <ul>
                <li><strong>Średnia ważona:</strong> Główny wskaźnik porównawczy</li>
                <li><strong>Mediana prędkości:</strong> Miara centralna odporna na outliers</li>
                <li><strong>Metoda MAD:</strong> Identyfikacja outlierów w prędkościach</li>
                <li><strong>Percentyle:</strong> P25, P75, P90, P95 - analiza rozkładu prędkości</li>
            </ul>
            
            <h5>7. Analiza według typów transportu (bez pociągów)</h5>
            <ul>
                <li><strong>SUBWAY:</strong> 44.42 km/h - najszybszy transport miejski</li>
                <li><strong>BUS:</strong> 25.92 km/h - dominujący (131,284 rekordów, 52.8%)</li>
                <li><strong>TROLLEY_BUS:</strong> 22.35 km/h</li>
                <li><strong>TRAM:</strong> 21.71 km/h</li>
                <li><strong>WATER_TRAM:</strong> 0.77 km/h (1 rekord)</li>
            </ul>
            
            <h5>8. Czynniki wpływające na prędkość</h5>
            <ul>
                <li><strong>Typ transportu:</strong> Metro > autobusy > trolejbusy > tramwaje</li>
                <li><strong>Infrastruktura:</strong> Dedykowane pasy, sygnalizacja świetlna</li>
                <li><strong>Częstotliwość przystanków:</strong> Gęstość sieci vs prędkość</li>
                <li><strong>Topografia terenu:</strong> Ukształtowanie miasta</li>
                <li><strong>Zarządzanie ruchem:</strong> Priorytety dla transportu publicznego</li>
            </ul>
            
            <h5>9. Znaczenie analizy v2</h5>
            <p><strong>Dlaczego wykluczyć pociągi?</strong></p>
            <ul>
                <li>Czysty obraz transportu miejskiego - bez szybkich połączeń podmiejskich</li>
                <li>Porównywalność miast - podobne warunki urbanistyczne</li>
                <li>Fokus na mobilność miejską - rzeczywiste doświadczenie mieszkańców</li>
                <li>Planowanie transportu - optymalizacja sieci miejskiej</li>
            </ul>
            
            <h5>10. Ograniczenia i założenia</h5>
            <ul>
                <li>Nie uwzględnia czasów przesiadek - tylko czas jazdy</li>
                <li>Analiza ograniczona do dni roboczych i godzin dziennych</li>
                <li>Brak kontekstu natężenia ruchu</li>
                <li>Wykluczenie może pomijać ważne elementy mobilności regionalnej</li>
            </ul>
        `,
        chart1Title: 'Średnia prędkość według regionów',
        chart2Title: 'Porównanie efektywności transportu',
        tableTitle: 'Statystyki prędkości podróżowania',
        dataFile: 'najszybciej_v2.json'
    },
    najtaniej: {
        title: 'Najtaniej - Koszty Podróży',
        description: [
            'Analiza kosztów podróży transportem publicznym w przeliczeniu na kilometr.',
            'Wskaźnik porównuje opłacalność transportu publicznego w różnych regionach.',
            'Niższe koszty na kilometr oznaczają bardziej przystępny cenowo transport.'
        ],
        methodology: `
            <h4>Metodologia analizy wskaźnika "najtaniej" - średni koszt kilometra</h4>
            
            <h5>🚨 KRYTYCZNE OGRANICZENIE DANYCH</h5>
            <p><strong>TYLKO 1.66% WSZYSTKICH REKORDÓW (5,068 z 304,581) ZAWIERA INFORMACJE O CENACH!</strong></p>
            
            <h5>1. Cel badania</h5>
            <p>Analiza ma na celu ocenę dostępności cenowej transportu publicznego poprzez pomiar średniego kosztu podróży w przeliczeniu na kilometr. <strong>UWAGA: Analiza jest bardzo ograniczona ze względu na brak danych cenowych w większości rekordów.</strong></p>
            
            <h5>2. Źródła danych</h5>
            <ul>
                <li><strong>Dane podstawowe:</strong> <code>jd_report_route_10.csv</code> - 304,581 rekordów z raportu Jakdojade</li>
                <li><strong>Kolumny analizowane:</strong>
                    <ul>
                        <li><code>total_price_cents</code> - całkowity koszt biletu w groszach</li>
                        <li><code>transport_length_meters</code> - długość trasy w metrach</li>
                    </ul>
                </li>
                <li><strong>Dane pomocnicze:</strong> <code>lista_miast_regionow.csv</code> - informacje o populacji regionów</li>
            </ul>
            
            <h5>3. Skala problemu z danymi</h5>
            <ul>
                <li><strong>94.02%</strong> rekordów nie ma danych o cenach</li>
                <li>Z 18,213 rekordów z danymi o cenach, <strong>72.17%</strong> ma cenę = 0</li>
                <li>Tylko <strong>5,068 rekordów</strong> ma rzeczywiste dane o cenach > 0</li>
                <li>Po filtrach (dni robocze, godziny dzienne): <strong>4,306 rekordów</strong></li>
                <li><strong>Konsekwencja:</strong> Analiza obejmuje głównie połączenia kolejowe (TRAIN) - 100% danych</li>
            </ul>
            
            <h5>4. Proces filtrowania i przetwarzania danych</h5>
            <ol>
                <li><strong>Filtrowanie podstawowe:</strong> Tylko rekordy z ceną > 0 - 5,068 rekordów (1.66%)</li>
                <li><strong>Filtrowanie czasowe:</strong> Tylko dni robocze (pon-pt) - 5,068 rekordów</li>
                <li><strong>Filtrowanie godzinowe:</strong> Tylko godziny dzienne (6:00-22:00) - 4,306 rekordów</li>
                <li><strong>Wykrywanie outlierów:</strong> Metoda MAD (threshold=3.5) - 234 outlierów (5.43%)</li>
                <li><strong>Filtrowanie regionów:</strong> Minimum 10 rekordów dla wiarygodności statystycznej</li>
            </ol>
            
            <h5>5. Wzór obliczeniowy</h5>
            <p><strong>Średni koszt kilometra</strong> = Σ(cena biletów w PLN) / Σ(długość tras w km)</p>
            <ul>
                <li><strong>Konwersja jednostek:</strong> Grosze → PLN, metry → kilometry</li>
                <li><strong>Metoda ważona:</strong> Uwzględnia rzeczywiste koszty i długości tras</li>
                <li><strong>Jednostka:</strong> PLN/km</li>
            </ul>
            
            <h5>6. DRAMATYCZNE OGRANICZENIA WYNIKÓW</h5>
            <ul>
                <li><strong>Tylko 4 regiony</strong> z 33 mają wystarczające dane do analizy</li>
                <li><strong>Brak danych</strong> dla: autobusów, tramwajów, metra, trolejbusów</li>
                <li><strong>100% danych</strong> to połączenia kolejowe (TRAIN)</li>
                <li><strong>Wyniki NIE SĄ reprezentatywne</strong> dla całego transportu publicznego</li>
            </ul>
            
            <h5>7. Ranking dostępnych regionów (4 regiony)</h5>
            <ul>
                <li><strong>LONG_DISTANCE:</strong> 0.347 PLN/km - najtańsze połączenia długodystansowe</li>
                <li><strong>TRÓJMIASTO:</strong> 0.428 PLN/km - najlepszy stosunek wśród miast</li>
                <li><strong>WARSZAWA:</strong> 0.511 PLN/km - konkurencyjne ceny</li>
                <li><strong>KRAKÓW:</strong> 0.826 PLN/km - najdroższy, wysoki % outlierów (36.9%)</li>
            </ul>
            
            <h5>8. Analiza według typów transportu</h5>
            <p><strong>UWAGA: Dane dostępne TYLKO dla pociągów!</strong></p>
            <ul>
                <li><strong>TRAIN:</strong> 0.488 PLN/km (4,306 tras)</li>
                <li><strong>Brak danych dla:</strong> BUS, TRAM, SUBWAY, TROLLEY_BUS, WATER_TRAM</li>
            </ul>
            
            <h5>9. Kluczowe benchmarki</h5>
            <ul>
                <li><strong>Średnia ważona:</strong> 0.488 PLN/km</li>
                <li><strong>Mediana:</strong> 0.524 PLN/km</li>
                <li><strong>Średnia cena biletu:</strong> 7.45 PLN</li>
                <li><strong>Średni dystans:</strong> 15.27 km</li>
            </ul>
            
            <h5>10. Czynniki wpływające na koszty</h5>
            <ul>
                <li><strong>Polityka taryfowa regionu:</strong> Różnice w systemach cenowych</li>
                <li><strong>Długość tras:</strong> Dłuższe trasy często proporcjonalnie tańsze</li>
                <li><strong>Typ biletu:</strong> Jednorazowy vs okresowy</li>
                <li><strong>Subwencje samorządowe:</strong> Wpływ na końcowe ceny</li>
                <li><strong>Typ transportu:</strong> Brak danych dla porównania</li>
            </ul>
            
            <h5>11. Wnioski i rekomendacje</h5>
            <p><strong>Co wiemy:</strong></p>
            <ul>
                <li>Kolej (TRAIN) - około 0.50 PLN/km</li>
                <li>Trójmiasto i Warszawa - konkurencyjne cenowo</li>
                <li>Połączenia długodystansowe najtańsze per kilometr</li>
            </ul>
            <p><strong>Czego NIE wiemy:</strong></p>
            <ul>
                <li>Koszty transportu miejskiego (autobusy, tramwaje, metro)</li>
                <li>Porównanie cenowe między różnymi środkami transportu</li>
                <li>Rzeczywiste koszty w 29 z 33 regionów</li>
                <li>Zintegrowane bilety i taryfy miejskie</li>
            </ul>
        `,
        chart1Title: 'Koszt na kilometr według regionów',
        chart2Title: 'Porównanie opłacalności',
        tableTitle: 'Statystyki kosztów (5 regionów z danymi)',
        dataFile: 'najtaniej.json'
    },
    najczesciej_nocne: {
        title: 'Najczęściej - Nocne (22:00-6:00)',
        description: [
            'Analiza średnich czasów oczekiwania na transport publiczny w godzinach nocnych (22:00-6:00).',
            'Wskaźnik pokazuje, jak długo użytkownicy muszą czekać na przyjazd środka transportu w porze nocnej.',
            'W godzinach nocnych zmienność czasów oczekiwania jest znacznie większa niż w ciągu dnia ze względu na rzadsze kursy.'
        ],
        methodology: `
            <h4>Metodologia analizy średniego czasu oczekiwania na połączenie - godziny nocne (22:00-6:00)</h4>
            
            <h5>1. Cel badania</h5>
            <p>Analiza ma na celu określenie efektywności systemów transportu publicznego w godzinach nocnych poprzez pomiar średnich czasów oczekiwania na transport w różnych regionach Polski. Wskaźnik mierzy faktyczny czas, jaki użytkownicy muszą czekać na przyjazd środka transportu w porze nocnej.</p>
            
            <h5>2. Źródła danych</h5>
            <ul>
                <li><strong>Dane podstawowe:</strong> <code>jd_report_route_10.csv</code> - 304,581 rekordów z raportu Jakdojade</li>
                <li><strong>Kolumna analizowana:</strong> <code>departure_wait_time_minutes</code> - czas oczekiwania na transport</li>
                <li><strong>Dane pomocnicze:</strong> <code>lista_miast_regionow.csv</code> - informacje o populacji regionów</li>
            </ul>
            
            <h5>3. Proces filtrowania i przetwarzania danych</h5>
            <ol>
                <li><strong>Filtrowanie czasowe:</strong> Tylko dni robocze (poniedziałek-piątek) - 302,281 rekordów (98.7%)</li>
                <li><strong>Filtrowanie godzinowe:</strong> Tylko godziny nocne (22:00-6:00) - 42,488 rekordów (14.0%)</li>
                <li><strong>Usunięcie braków danych:</strong> Pozostało 41,216 rekordów do analizy</li>
                <li><strong>Wykrywanie outlierów:</strong> Metoda MAD (Median Absolute Deviation) z progiem 3.5</li>
            </ol>
            
            <h5>4. Zastosowane metody statystyczne</h5>
            <ul>
                <li><strong>Metoda MAD:</strong> Skalowanie: 1.4826 × MAD (normalizacja do odchylenia standardowego)</li>
                <li><strong>Statystyki opisowe:</strong> Średnia, mediana, odchylenie standardowe, percentyle (P25, P75, P90, P95)</li>
                <li><strong>Analiza rozkładu:</strong> Ekstremalnie prawostronnie skośny rozkład czasów oczekiwania w nocy</li>
            </ul>
            
            <h5>5. Kluczowe różnice względem wskaźnika dziennego</h5>
            <ul>
                <li><strong>Znacznie mniejsza liczba połączeń:</strong> 41,216 vs 255,785 (84% mniej)</li>
                <li><strong>Wyższa zmienność czasów:</strong> różnice średnia-mediana 2-3x większe</li>
                <li><strong>Więcej outlierów:</strong> średnio 8-12% vs 4-5% w dzień</li>
                <li><strong>Podobne mediany:</strong> większość miast nadal 5-7 minut</li>
            </ul>
            
            <h5>6. Charakterystyka godzin nocnych</h5>
            <ul>
                <li><strong>Rzadsze kursy:</strong> powodują dłuższe czasy oczekiwania</li>
                <li><strong>Większa nieprzewidywalność:</strong> rozkładów jazdy</li>
                <li><strong>Możliwe przerwania:</strong> kursowania w niektórych godzinach</li>
                <li><strong>Transport specjalny:</strong> busy nocne, linie nocne</li>
            </ul>
            
            <h5>7. Ranking miast według mediany czasu oczekiwania</h5>
            <ul>
                <li><strong>Najlepsze (5.0 min):</strong> Kraków, Wrocław, Warszawa, Poznań</li>
                <li><strong>Dobre (6.0 min):</strong> Trójmiasto, GOP, Bydgoszcz, Lublin, Szczecin</li>
                <li><strong>Problemowe:</strong> Lublin (26.86 min różnica średnia-mediana), Konin (116.77 min średnia)</li>
            </ul>
            
            <h5>8. Ograniczenia i założenia</h5>
            <ul>
                <li>Analiza ograniczona do dni roboczych i godzin nocnych (22:00-6:00)</li>
                <li>Zastosowanie mediany jako głównego wskaźnika ze względu na skośność rozkładu</li>
                <li>Outliers (8-12% połączeń) mogą wskazywać na poważne problemy systemowe</li>
                <li>Różnice regionalne wynikają z różnych strategii transportu nocnego</li>
            </ul>
        `,
        chart1Title: 'Średnie czasy oczekiwania według regionów (nocne)',
        chart2Title: 'Rozkład czasów oczekiwania według regionu (nocne)',
        tableTitle: 'Podsumowanie czasów oczekiwania (nocne)',
        dataFile: 'najczesciej_v2_nocne.json'
    },
    najmniej_czekania_nocne: {
        title: 'Najmniej Czekania - Nocne (22:00-6:00)',
        description: [
            'Analiza czasów oczekiwania na odjazd środków transportu publicznego w godzinach nocnych (22:00-6:00).',
            'Wskaźnik mierzy czas od momentu chęci rozpoczęcia podróży do rzeczywistego odjazdu pierwszego środka transportu w nocy.',
            'Identyczna mediana jak w dzień (5.0 min), ale dwukrotnie wyższa średnia ze względu na większą zmienność nocną.'
        ],
        methodology: `
            <h4>Metodologia analizy wskaźnika "najmniej czekania na odjazd" - godziny nocne (22:00-6:00)</h4>
            
            <h5>1. Cel badania</h5>
            <p>Analiza ma na celu ocenę efektywności planowania podróży nocnych poprzez pomiar średniego czasu czekania na początek pierwszej trasy względem zadanego czasu wyszukiwania w godzinach nocnych. Wskaźnik mierzy rzeczywiste doświadczenie użytkownika przy planowaniu podróży nocnych.</p>
            
            <h5>2. Źródła danych</h5>
            <ul>
                <li><strong>Dane podstawowe:</strong> <code>jd_report_route_10.csv</code> - 304,581 rekordów z raportu Jakdojade</li>
                <li><strong>Kolumna analizowana:</strong> <code>departure_wait_time_minutes</code> - czas oczekiwania na odjazd z pierwszego przystanku</li>
                <li><strong>Dane pomocnicze:</strong> <code>lista_miast_regionow.csv</code> - informacje o populacji regionów</li>
            </ul>
            
            <h5>3. Proces filtrowania i przetwarzania danych</h5>
            <ol>
                <li><strong>Filtrowanie czasowe:</strong> Tylko dni robocze (poniedziałek-piątek) - 302,281 rekordów (99.2%)</li>
                <li><strong>Filtrowanie godzinowe:</strong> Tylko godziny nocne (22:00-6:00) - 42,488 rekordów (14.1%)</li>
                <li><strong>Usunięcie braków danych:</strong> Pozostało 41,216 rekordów do analizy</li>
                <li><strong>Wykrywanie outlierów:</strong> Metoda MAD (Median Absolute Deviation) z progiem 3.5</li>
            </ol>
            
            <h5>4. Definicja wskaźnika</h5>
            <p><strong>Czas czekania na odjazd</strong> = czas rozpoczęcia podróży - zadany czas wyszukiwania</p>
            <ul>
                <li><strong>0 minut</strong> = możliwość natychmiastowego odjazdu</li>
                <li><strong>Wyższe wartości</strong> = dłuższe oczekiwanie na pierwszy środek transportu</li>
                <li><strong>Jednostka:</strong> Minuty</li>
            </ul>
            
            <h5>5. Kluczowe wyniki nocne vs dzienne</h5>
            <ul>
                <li><strong>Identyczna mediana:</strong> 5.0 min (dzień i noc)</li>
                <li><strong>Dwukrotnie wyższa średnia:</strong> 16.50 min vs 7.91 min w dzień</li>
                <li><strong>Znacznie wyższe odsetki outlierów:</strong> 8-12% vs 4-5% w dzień</li>
                <li><strong>Ekstremalne wartości:</strong> niektóre regiony mają ponad 25% outlierów</li>
            </ul>
            
            <h5>6. Ranking miast - TOP 4 (według mediany)</h5>
            <ul>
                <li><strong>Warszawa, Poznań, Wrocław, Kraków:</strong> 5.0 min mediana</li>
                <li><strong>Liderzy efektywności nocnej:</strong> najkrótszy czas czekania</li>
                <li><strong>Transport szynowy:</strong> zachowuje przewagę nad autobusami w nocy</li>
            </ul>
            
            <h5>7. Analiza według typów transportu</h5>
            <ul>
                <li><strong>Metro:</strong> 3.0 min mediana - najkrótszy czas czekania</li>
                <li><strong>Tramwaj:</strong> 4.0 min mediana - bardzo dobra częstotliwość</li>
                <li><strong>Trolejbus:</strong> 5.0 min mediana - dobra częstotliwość</li>
                <li><strong>Autobus:</strong> 6.0 min mediana - najliczniejszy, dłuższe czekanie</li>
                <li><strong>Pociąg:</strong> 8.0 min mediana - najdłuższy czas czekania</li>
            </ul>
            
            <h5>8. Miasta z ekstremalnymi problemami nocnymi</h5>
            <ul>
                <li><strong>Konin:</strong> 14.5 min mediana, 116.77 min średnia, 28.6% outlierów</li>
                <li><strong>Leszno:</strong> 21.0 min mediana, 102.42 min średnia, 26.3% outlierów</li>
                <li><strong>Kołobrzeg:</strong> 19.5 min mediana, 103.0 min średnia, 25.0% outlierów</li>
            </ul>
            
            <h5>9. Charakterystyka czasu czekania nocnego</h5>
            <ul>
                <li><strong>50% podróży nocnych</strong> rozpoczyna się w ciągu 5 minut (tak samo jak w dzień!)</li>
                <li><strong>90% podróży</strong> rozpoczyna się w ciągu 16-29 minut (vs 15-20 minut w dzień)</li>
                <li><strong>Średnio 8-12% połączeń</strong> to outliers z bardzo długimi czasami czekania</li>
                <li><strong>Większe miasta</strong> radzą sobie lepiej z utrzymaniem częstotliwości nocnej</li>
            </ul>
            
            <h5>10. Ograniczenia i założenia</h5>
            <ul>
                <li>Dane historyczne - rzeczywiste czasy mogą się różnić</li>
                <li>Fokus na dniach roboczych - weekendy mogą mieć inne charakterystyki</li>
                <li>Brak kontekstu lokalizacji - czasy mogą się różnić centrum vs peryferia</li>
                <li>Agregacja regionalna - ukrywa różnice wewnątrz miast</li>
                <li>Nie da się bezpośrednio przenieść rozwiązań dziennych na noc</li>
            </ul>
        `,
        chart1Title: 'Czasy oczekiwania na odjazd (nocne)',
        chart2Title: 'Efektywność rozkładów jazdy (nocne)',
        tableTitle: 'Statystyki oczekiwania na odjazd (nocne)',
        dataFile: 'najmniej_czekania_nocne.json'
    }
};

// Stan aplikacji
let currentIndicator = 'home';
let currentData = null;

// Elementy DOM
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Obsługa hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Obsługa nawigacji
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Usuń aktywną klasę z wszystkich linków
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Dodaj aktywną klasę do klikniętego linku
        link.classList.add('active');
        
        // Pobierz identyfikator wskaźnika
        const indicator = link.getAttribute('data-indicator');
        
        // Załaduj zawartość wskaźnika
        loadIndicator(indicator);
        
        // Zamknij menu na mobile
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Przewiń do góry
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Funkcja ładowania wskaźnika
async function loadIndicator(indicatorId) {
    currentIndicator = indicatorId;
    const indicator = indicators[indicatorId];
    
    if (!indicator) {
        console.error('Nieznany wskaźnik:', indicatorId);
        return;
    }
    
    // Aktualizuj elementy interfejsu
    updateUI(indicator);
    
    // Załaduj dane jeśli są dostępne
    if (indicator.dataFile) {
        try {
            showLoading();
            await loadData(indicator.dataFile);
            hideLoading();
        } catch (error) {
            console.error('Błąd ładowania danych:', error);
            showError('Nie udało się załadować danych dla tego wskaźnika.');
            hideLoading();
        }
    } else {
        // Wyczyść wykresy i tabelę dla strony głównej
        clearChartsAndTable();
    }
}

// Funkcja aktualizacji interfejsu
function updateUI(indicator) {
    // Aktualizuj tytuł
    document.getElementById('indicator-title').textContent = indicator.title;
    
    // Aktualizuj opis
    const descriptionContent = document.getElementById('description-content');
    descriptionContent.innerHTML = indicator.description
        .map(p => `<p>${p}</p>`)
        .join('');
    
    // Aktualizuj metodologię
    document.getElementById('methodology-content').innerHTML = indicator.methodology;
    
    // Aktualizuj tytuły wykresów i tabeli
    document.getElementById('chart1-title').textContent = indicator.chart1Title;
    document.getElementById('chart2-title').textContent = indicator.chart2Title;
    document.getElementById('table-title').textContent = indicator.tableTitle;
    
    // Dodaj animację
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        setTimeout(() => section.classList.remove('fade-in'), 500);
    });
}

// Funkcja ładowania danych
async function loadData(filename) {
    try {
        const response = await fetch(`data/${filename}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        currentData = await response.json();
        
        // Renderuj wykresy i tabelę
        renderCharts();
        renderTable();
        
    } catch (error) {
        console.error('Błąd ładowania danych:', error);
        throw error;
    }
}

// Funkcja renderowania wykresów
function renderCharts() {
    const chart1 = document.getElementById('chart1');
    const chart2 = document.getElementById('chart2');
    
    if (currentData && currentIndicator === 'najczesciej') {
        renderNajczescieiCharts();
    } else if (currentData && currentIndicator === 'najmniej_chodzenia') {
        renderNajmniejChodzeniaCharts();
    } else if (currentData && currentIndicator === 'najmniej_czekania') {
        renderNajmniejCzekaniaCharts();
    } else if (currentData && currentIndicator === 'najmniej_przesiadek') {
        renderNajmniejPrzesiadekCharts();
    } else if (currentData && currentIndicator === 'najpunktualniej') {
        renderNajpunktualniejCharts();
    } else if (currentData && currentIndicator === 'najszybciej') {
        renderNajszybciejCharts();
    } else if (currentData && currentIndicator === 'najtaniej') {
        renderNajtaniejCharts();
    } else if (currentData && currentIndicator === 'najczesciej_nocne') {
        renderNajczescieiNocneCharts();
    } else if (currentData && currentIndicator === 'najmniej_czekania_nocne') {
        renderNajmniejCzekaniaNocneCharts();
    } else if (currentData && currentData.charts) {
        // Chart 1
        if (currentData.charts.chart1) {
            chart1.innerHTML = `
                <div style="background: linear-gradient(45deg, #667eea, #764ba2); 
                           color: white; padding: 2rem; border-radius: 8px; text-align: center;">
                    <h4>Wykres 1 - ${currentData.charts.chart1.title}</h4>
                    <p>Dane załadowane: ${currentData.charts.chart1.dataPoints} punktów</p>
                    <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.9;">
                        Implementacja wizualizacji będzie dodana w kolejnych iteracjach
                    </p>
                </div>
            `;
        }
        
        // Chart 2
        if (currentData.charts.chart2) {
            chart2.innerHTML = `
                <div style="background: linear-gradient(45deg, #764ba2, #667eea); 
                           color: white; padding: 2rem; border-radius: 8px; text-align: center;">
                    <h4>Wykres 2 - ${currentData.charts.chart2.title}</h4>
                    <p>Dane załadowane: ${currentData.charts.chart2.dataPoints} punktów</p>
                    <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.9;">
                        Implementacja wizualizacji będzie dodana w kolejnych iteracjach
                    </p>
                </div>
            `;
        }
    } else {
        chart1.innerHTML = '<p>Brak danych dla wykresu 1</p>';
        chart2.innerHTML = '<p>Brak danych dla wykresu 2</p>';
    }
}

// Funkcja renderowania wykresów dla wskaźnika najczęściej
function renderNajczescieiCharts() {
    const chart1 = document.getElementById('chart1');
    const chart2 = document.getElementById('chart2');
    
    // Wykres 1 - Średnie czasy oczekiwania według regionów
    chart1.innerHTML = `
        <canvas id="chart1-canvas" width="400" height="200"></canvas>
    `;
    
    // Przygotuj dane dla wykresu
    const sortedData = currentData.data.sort((a, b) => a.primary_value - b.primary_value);
    const labels = sortedData.map(item => item.city_name);
    const meanValues = sortedData.map(item => item.metrics.mean);
    const medianValues = sortedData.map(item => item.metrics.median);
    
    // Generuj kolory od zielonego do czerwonego
    const colors = generateGradientColors(sortedData.length);
    
    // Stwórz wykres
    const ctx1 = document.getElementById('chart1-canvas').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Średni czas oczekiwania (min)',
                data: meanValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }, {
                label: 'Mediana (min)',
                data: medianValues,
                type: 'line',
                fill: false,
                borderColor: '#2c3e50',
                backgroundColor: '#2c3e50',
                pointBackgroundColor: '#2c3e50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Średnie czasy oczekiwania według regionów (sortowane od najlepszych)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        afterBody: function(context) {
                            const dataIndex = context[0].dataIndex;
                            const item = sortedData[dataIndex];
                            return [
                                `Pozycja w rankingu: ${item.rank}`,
                                `Populacja: ${item.population.toLocaleString('pl-PL')}`,
                                `Liczba tras: ${item.metrics.n_records.toLocaleString('pl-PL')}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Regiony'
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Czas oczekiwania (minuty)'
                    },
                    beginAtZero: true
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
    
    // Wykres 2 - Rozkład czasów oczekiwania z dropdown
    chart2.innerHTML = `
        <div class="chart-controls">
            <label for="region-select">Wybierz region:</label>
            <select id="region-select" class="region-dropdown">
                <option value="">Wybierz region...</option>
                ${currentData.data.sort((a, b) => a.city_name.localeCompare(b.city_name, 'pl-PL')).map(item => 
                    `<option value="${item.region_code}">${item.city_name}</option>`
                ).join('')}
            </select>
        </div>
        <div class="chart-canvas-container">
            <canvas id="chart2-canvas" width="400" height="200"></canvas>
        </div>
    `;
    
    // Dodaj event listener dla dropdown
    const regionSelect = document.getElementById('region-select');
    regionSelect.addEventListener('change', function() {
        const selectedRegion = this.value;
        if (selectedRegion) {
            updateWaitTimeDistributionChart(selectedRegion);
        }
    });
    
    // Inicjalnie wybierz pierwszy region
    if (currentData.data.length > 0) {
        regionSelect.value = currentData.data[0].region_code;
        updateWaitTimeDistributionChart(currentData.data[0].region_code);
    }
}

// Funkcja aktualizacji wykresu rozkładu czasów oczekiwania
function updateWaitTimeDistributionChart(regionCode) {
    const regionData = currentData.data.find(item => item.region_code === regionCode);
    if (!regionData) return;
    
    const ctx2 = document.getElementById('chart2-canvas').getContext('2d');
    
    // Zniszcz poprzedni wykres jeśli istnieje
    if (window.waitTimeDistributionChart) {
        window.waitTimeDistributionChart.destroy();
    }
    
    // STAŁE JEDNOLITE PRZEDZIAŁY CZASOWE dla wszystkich regionów
    const uniformBins = [
        { range: '0-2 min', min: 0, max: 2 },
        { range: '2-4 min', min: 2, max: 4 },
        { range: '4-6 min', min: 4, max: 6 },
        { range: '6-8 min', min: 6, max: 8 },
        { range: '8-10 min', min: 8, max: 10 },
        { range: '10-12 min', min: 10, max: 12 },
        { range: '12-15 min', min: 12, max: 15 },
        { range: '15-20 min', min: 15, max: 20 },
        { range: '20-25 min', min: 20, max: 25 },
        { range: '25-30 min', min: 25, max: 30 },
        { range: '30+ min', min: 30, max: Infinity }
    ];
    
    // Oszacuj rozkład na podstawie percentyli regionu
    const percentiles = regionData.percentiles;
    const distributionValues = estimateDistributionFromPercentiles(percentiles, uniformBins);
    
    // Stwórz nowy wykres
    window.waitTimeDistributionChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: uniformBins.map(bin => bin.range),
            datasets: [{
                label: 'Procent wyszukań',
                data: distributionValues,
                backgroundColor: 'rgba(52, 152, 219, 0.7)',  // Jednolity niebieski kolor
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Rozkład czasów oczekiwania - ${regionData.city_name}`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const binIndex = context.dataIndex;
                            const binRange = uniformBins[binIndex].range;
                            const percentage = context.parsed.y;
                            const estimatedTrails = Math.round((percentage / 100) * regionData.metrics.n_records);
                            
                            return [
                                `${binRange}: ${percentage.toFixed(1)}%`,
                                `~${estimatedTrails.toLocaleString('pl-PL')} tras w tym przedziale`
                            ];
                        },
                        afterBody: function(context) {
                            return [
                                '',
                                `Region: ${regionData.city_name}`,
                                `Pozycja w rankingu: ${regionData.rank}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Zakres czasów oczekiwania'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Procent wyszukań (%)'
                    },
                    beginAtZero: true,
                    max: 50
                }
            }
        }
    });
}

// Funkcja pomocnicza do oszacowania rozkładu na podstawie percentyli
function estimateDistributionFromPercentiles(percentiles, bins) {
    const p25 = percentiles.p25;
    const p75 = percentiles.p75;
    const p90 = percentiles.p90;
    const p95 = percentiles.p95;
    
    const distribution = new Array(bins.length).fill(0);
    
    // Oszacuj rozkład na podstawie percentyli
    bins.forEach((bin, index) => {
        const midpoint = bin.max === Infinity ? bin.min + 5 : (bin.min + bin.max) / 2;
        
        if (midpoint <= p25) {
            // 25% danych jest poniżej p25
            distribution[index] = 25 / bins.filter(b => (b.max === Infinity ? b.min + 5 : (b.min + b.max) / 2) <= p25).length;
        } else if (midpoint <= p75) {
            // 50% danych jest między p25 a p75
            distribution[index] = 50 / bins.filter(b => {
                const mp = b.max === Infinity ? b.min + 5 : (b.min + b.max) / 2;
                return mp > p25 && mp <= p75;
            }).length;
        } else if (midpoint <= p90) {
            // 15% danych jest między p75 a p90
            distribution[index] = 15 / bins.filter(b => {
                const mp = b.max === Infinity ? b.min + 5 : (b.min + b.max) / 2;
                return mp > p75 && mp <= p90;
            }).length;
        } else if (midpoint <= p95) {
            // 5% danych jest między p90 a p95
            distribution[index] = 5 / bins.filter(b => {
                const mp = b.max === Infinity ? b.min + 5 : (b.min + b.max) / 2;
                return mp > p90 && mp <= p95;
            }).length;
        } else {
            // 5% danych jest powyżej p95
            distribution[index] = 5 / bins.filter(b => {
                const mp = b.max === Infinity ? b.min + 5 : (b.min + b.max) / 2;
                return mp > p95;
            }).length;
        }
    });
    
    return distribution;
}

function renderNajmniejChodzeniaCharts() {
    const chart1 = document.getElementById('chart1');
    const chart2 = document.getElementById('chart2');
    
    // Wykres 1 - Średnia długość chodzenia według regionów
    chart1.innerHTML = `<canvas id="chart1-canvas" width="400" height="200"></canvas>`;
    const sortedData = currentData.data.sort((a, b) => a.primary_value - b.primary_value);
    const labels = sortedData.map(item => item.city_name);
    const meanValues = sortedData.map(item => item.metrics.srednia_chodzenie_m);
    const medianValues = sortedData.map(item => item.metrics.mediana_chodzenie_m);
    const colors = generateGradientColors(sortedData.length);
    const ctx1 = document.getElementById('chart1-canvas').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Średnia długość chodzenia (m)',
                data: meanValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }, {
                label: 'Mediana (m)',
                data: medianValues,
                type: 'line',
                fill: false,
                borderColor: '#2c3e50',
                backgroundColor: '#2c3e50',
                pointBackgroundColor: '#2c3e50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Średnia długość chodzenia według regionów',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { display: true, position: 'top' },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        afterBody: function(context) {
                            const dataIndex = context[0].dataIndex;
                            const item = sortedData[dataIndex];
                            return [
                                `Pozycja w rankingu: ${item.rank}`,
                                `Populacja: ${item.population ? item.population.toLocaleString('pl-PL') : '-'}`,
                                `Liczba tras: ${item.metrics.liczba_tras ? item.metrics.liczba_tras.toLocaleString('pl-PL') : '-'}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: { display: true, title: { display: true, text: 'Regiony' }, ticks: { maxRotation: 45, minRotation: 45 } },
                y: { display: true, title: { display: true, text: 'Długość chodzenia (metry)' }, beginAtZero: true }
            },
            interaction: { mode: 'index', intersect: false }
        }
    });

    // Wykres 2 - Rozkład dystansów pieszych z dropdown
    chart2.innerHTML = `
        <div class="chart-controls">
            <label for="region-select-walking">Wybierz region:</label>
            <select id="region-select-walking" class="region-dropdown">
                <option value="">Wybierz region...</option>
                ${currentData.data.filter(item => item.region_code !== 'LONG_DISTANCE').sort((a, b) => a.city_name.localeCompare(b.city_name, 'pl-PL')).map(item => 
                    `<option value="${item.region_code}">${item.city_name}</option>`
                ).join('')}
            </select>
        </div>
        <div class="chart-canvas-container">
            <canvas id="chart2-canvas" width="400" height="200"></canvas>
        </div>
    `;
    
    // Dodaj event listener dla dropdown
    const regionSelect = document.getElementById('region-select-walking');
    regionSelect.addEventListener('change', function() {
        const selectedRegion = this.value;
        if (selectedRegion) {
            updateWalkingDistanceDistributionChart(selectedRegion);
        }
    });
    
    // Inicjalnie wybierz pierwszy region (pomijając LONG_DISTANCE)
    const regularRegions = currentData.data.filter(item => item.region_code !== 'LONG_DISTANCE');
    if (regularRegions.length > 0) {
        regionSelect.value = regularRegions[0].region_code;
        updateWalkingDistanceDistributionChart(regularRegions[0].region_code);
    }
}

// Funkcja aktualizacji wykresu rozkładu dystansów pieszych
function updateWalkingDistanceDistributionChart(regionCode) {
    const regionData = currentData.data.find(item => item.region_code === regionCode);
    if (!regionData) return;
    
    const ctx2 = document.getElementById('chart2-canvas').getContext('2d');
    
    // Zniszcz poprzedni wykres jeśli istnieje
    if (window.walkingDistanceDistributionChart) {
        window.walkingDistanceDistributionChart.destroy();
    }
    
    // Przygotuj dane rozkładu na podstawie statystyk
    const mean = regionData.metrics.srednia_chodzenie_m;
    const median = regionData.metrics.mediana_chodzenie_m;
    const min = regionData.metrics.min_chodzenie_m;
    const max = regionData.metrics.max_chodzenie_m;
    
    // STAŁE JEDNOLITE PRZEDZIAŁY ODLEGŁOŚCI dla wszystkich regionów
    const uniformBins = [
        { range: '0-100 m', min: 0, max: 100 },
        { range: '100-200 m', min: 100, max: 200 },
        { range: '200-300 m', min: 200, max: 300 },
        { range: '300-400 m', min: 300, max: 400 },
        { range: '400-500 m', min: 400, max: 500 },
        { range: '500-600 m', min: 500, max: 600 },
        { range: '600-700 m', min: 600, max: 700 },
        { range: '700-800 m', min: 700, max: 800 },
        { range: '800-1000 m', min: 800, max: 1000 },
        { range: '1000+ m', min: 1000, max: Infinity }
    ];
    
    // Oszacuj rozkład na podstawie statystyk (używając percentyli symulowanych z średniej/mediany)
    const simulatedPercentiles = {
        p25: Math.max(min, median * 0.7),
        p75: median * 1.4,
        p90: Math.min(max, median * 2.0),
        p95: Math.min(max, median * 2.5)
    };
    
    const distributionValues = estimateDistributionFromPercentiles(simulatedPercentiles, uniformBins);
    
    // Stwórz nowy wykres
    window.walkingDistanceDistributionChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: uniformBins.map(bin => bin.range),
            datasets: [{
                label: 'Procent tras',
                data: distributionValues,
                backgroundColor: 'rgba(34, 139, 34, 0.7)', // Zielony dla chodzenia
                borderColor: 'rgba(34, 139, 34, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Rozkład dystansów pieszych - ${regionData.city_name}`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const binIndex = context.dataIndex;
                            const binRange = uniformBins[binIndex].range;
                            const percentage = context.parsed.y;
                            const estimatedTrails = Math.round((percentage / 100) * regionData.metrics.liczba_tras);
                            
                            return [
                                `${binRange}: ${percentage.toFixed(1)}%`,
                                `~${estimatedTrails.toLocaleString('pl-PL')} tras w tym przedziale`
                            ];
                        },
                        afterBody: function(context) {
                            return [
                                '',
                                `Region: ${regionData.city_name}`,
                                `Pozycja w rankingu: ${regionData.rank}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Zakres dystansów pieszych'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Procent tras (%)'
                    },
                    beginAtZero: true,
                    max: 80
                }
            }
        }
    });
}

function renderNajmniejCzekaniaCharts() {
    const chart1 = document.getElementById('chart1');
    const chart2 = document.getElementById('chart2');
    
    // Wykres 1 - Średni czas czekania na odjazd według regionów
    chart1.innerHTML = `<canvas id="chart1-canvas" width="400" height="200"></canvas>`;
    
    // Przygotuj dane dla wykresu
    const sortedData = currentData.data.sort((a, b) => a.primary_value - b.primary_value);
    const labels = sortedData.map(item => item.city_name);
    const meanValues = sortedData.map(item => item.metrics.mean);
    const medianValues = sortedData.map(item => item.metrics.median);
    
    // Generuj kolory od zielonego do czerwonego
    const colors = generateGradientColors(sortedData.length);
    
    // Stwórz wykres
    const ctx1 = document.getElementById('chart1-canvas').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Średni czas czekania (min)',
                data: meanValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }, {
                label: 'Mediana (min)',
                data: medianValues,
                type: 'line',
                fill: false,
                borderColor: '#2c3e50',
                backgroundColor: '#2c3e50',
                pointBackgroundColor: '#2c3e50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Średni czas czekania na odjazd według regionów (sortowane od najlepszych)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        afterBody: function(context) {
                            const dataIndex = context[0].dataIndex;
                            const item = sortedData[dataIndex];
                            return [
                                `Pozycja w rankingu: ${item.rank}`,
                                `Populacja: ${item.population.toLocaleString('pl-PL')}`,
                                `Liczba próbek: ${item.metrics.n_samples.toLocaleString('pl-PL')}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Regiony'
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Czas czekania (minuty)'
                    },
                    beginAtZero: true
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
    
    // Wykres 2 - Rozkład czasów czekania z dropdown
    chart2.innerHTML = `
        <div class="chart-controls">
            <label for="region-select-departure">Wybierz region:</label>
            <select id="region-select-departure" class="region-dropdown">
                <option value="">Wybierz region...</option>
                ${currentData.data.sort((a, b) => a.city_name.localeCompare(b.city_name, 'pl-PL')).map(item => 
                    `<option value="${item.region_code}">${item.city_name}</option>`
                ).join('')}
            </select>
        </div>
        <div class="chart-canvas-container">
            <canvas id="chart2-canvas" width="400" height="200"></canvas>
        </div>
    `;
    
    // Dodaj event listener dla dropdown
    const regionSelect = document.getElementById('region-select-departure');
    regionSelect.addEventListener('change', function() {
        const selectedRegion = this.value;
        if (selectedRegion) {
            updateDepartureWaitDistributionChart(selectedRegion);
        }
    });
    
    // Inicjalnie wybierz pierwszy region
    if (currentData.data.length > 0) {
        regionSelect.value = currentData.data[0].region_code;
        updateDepartureWaitDistributionChart(currentData.data[0].region_code);
    }
}

// Funkcja aktualizacji wykresu rozkładu czasów czekania na odjazd
function updateDepartureWaitDistributionChart(regionCode) {
    const regionData = currentData.data.find(item => item.region_code === regionCode);
    if (!regionData) return;
    
    const ctx2 = document.getElementById('chart2-canvas').getContext('2d');
    
    // Zniszcz poprzedni wykres jeśli istnieje
    if (window.departureWaitDistributionChart) {
        window.departureWaitDistributionChart.destroy();
    }
    
    // STAŁE JEDNOLITE PRZEDZIAŁY CZASOWE dla wszystkich regionów
    const uniformBins = [
        { range: '0-2 min', min: 0, max: 2 },
        { range: '2-4 min', min: 2, max: 4 },
        { range: '4-6 min', min: 4, max: 6 },
        { range: '6-8 min', min: 6, max: 8 },
        { range: '8-10 min', min: 8, max: 10 },
        { range: '10-12 min', min: 10, max: 12 },
        { range: '12-15 min', min: 12, max: 15 },
        { range: '15-20 min', min: 15, max: 20 },
        { range: '20-25 min', min: 20, max: 25 },
        { range: '25-30 min', min: 25, max: 30 },
        { range: '30+ min', min: 30, max: Infinity }
    ];
    
    // Oszacuj rozkład na podstawie percentyli regionu
    const percentiles = regionData.percentiles;
    const distributionValues = estimateDistributionFromPercentiles(percentiles, uniformBins);
    
    // Stwórz nowy wykres
    window.departureWaitDistributionChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: uniformBins.map(bin => bin.range),
            datasets: [{
                label: 'Procent wyszukań',
                data: distributionValues,
                backgroundColor: 'rgba(255, 99, 132, 0.7)',  // Różowy kolor dla czekania na odjazd
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Rozkład czasów czekania na odjazd - ${regionData.city_name}`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const binIndex = context.dataIndex;
                            const binRange = uniformBins[binIndex].range;
                            const percentage = context.parsed.y;
                            const estimatedTrails = Math.round((percentage / 100) * regionData.metrics.n_samples);
                            
                            return [
                                `${binRange}: ${percentage.toFixed(1)}%`,
                                `~${estimatedTrails.toLocaleString('pl-PL')} tras w tym przedziale`
                            ];
                        },
                        afterBody: function(context) {
                            return [
                                '',
                                `Region: ${regionData.city_name}`,
                                `Pozycja w rankingu: ${regionData.rank}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Zakres czasów czekania na odjazd'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Procent wyszukań (%)'
                    },
                    beginAtZero: true,
                    max: 50
                }
            }
        }
    });
}

function renderNajmniejPrzesiadekCharts() {
    const chart1 = document.getElementById('chart1');
    const chart2 = document.getElementById('chart2');
    
    // Wykres 1 - Średnia liczba przesiadek według regionów
    chart1.innerHTML = `<canvas id="chart1-canvas" width="400" height="200"></canvas>`;
    const sortedData = currentData.data.sort((a, b) => a.primary_value - b.primary_value);
    const labels = sortedData.map(item => item.city_name);
    const meanValues = sortedData.map(item => item.metrics.srednia);
    const medianValues = sortedData.map(item => item.metrics.mediana);
    const colors = generateGradientColors(sortedData.length);
    const ctx1 = document.getElementById('chart1-canvas').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Średnia liczba przesiadek',
                data: meanValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }, {
                label: 'Mediana',
                data: medianValues,
                type: 'line',
                fill: false,
                borderColor: '#2c3e50',
                backgroundColor: '#2c3e50',
                pointBackgroundColor: '#2c3e50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Średnia liczba przesiadek według regionów',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { display: true, position: 'top' },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        afterBody: function(context) {
                            const dataIndex = context[0].dataIndex;
                            const item = sortedData[dataIndex];
                            return [
                                `Pozycja w rankingu: ${item.rank}`,
                                `Populacja: ${item.population ? item.population.toLocaleString('pl-PL') : '-'}`,
                                `Liczba tras: ${item.metrics.liczba_tras ? item.metrics.liczba_tras.toLocaleString('pl-PL') : '-'}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: { display: true, title: { display: true, text: 'Regiony' }, ticks: { maxRotation: 45, minRotation: 45 } },
                y: { display: true, title: { display: true, text: 'Liczba przesiadek' }, beginAtZero: true }
            },
            interaction: { mode: 'index', intersect: false }
        }
    });

    // Wykres 2 - Rozkład liczby przesiadek z dropdown
    chart2.innerHTML = `
        <div class="chart-controls">
            <label for="region-select-transfers">Wybierz region:</label>
            <select id="region-select-transfers" class="region-dropdown">
                <option value="">Wybierz region...</option>
                ${currentData.data.filter(item => item.region_code !== 'LONG_DISTANCE').sort((a, b) => a.city_name.localeCompare(b.city_name, 'pl-PL')).map(item => 
                    `<option value="${item.region_code}">${item.city_name}</option>`
                ).join('')}
            </select>
        </div>
        <div class="chart-canvas-container">
            <canvas id="chart2-canvas" width="400" height="200"></canvas>
        </div>
    `;
    
    // Dodaj event listener dla dropdown
    const regionSelect = document.getElementById('region-select-transfers');
    regionSelect.addEventListener('change', function() {
        const selectedRegion = this.value;
        if (selectedRegion) {
            updateTransfersDistributionChart(selectedRegion);
        }
    });
    
    // Inicjalnie wybierz pierwszy region (pomijając LONG_DISTANCE)
    const regularRegions = currentData.data.filter(item => item.region_code !== 'LONG_DISTANCE');
    if (regularRegions.length > 0) {
        regionSelect.value = regularRegions[0].region_code;
        updateTransfersDistributionChart(regularRegions[0].region_code);
    }
}

// Funkcja aktualizacji wykresu rozkładu liczby przesiadek
function updateTransfersDistributionChart(regionCode) {
    const regionData = currentData.data.find(item => item.region_code === regionCode);
    if (!regionData) return;
    
    const ctx2 = document.getElementById('chart2-canvas').getContext('2d');
    
    // Zniszcz poprzedni wykres jeśli istnieje
    if (window.transfersDistributionChart) {
        window.transfersDistributionChart.destroy();
    }
    
    // Przygotuj dane rozkładu na podstawie średniej i odchylenia standardowego
    const mean = regionData.metrics.srednia;
    const std = regionData.metrics.std;
    
    // Oszacuj rozkład liczby przesiadek (uproszczony na podstawie średniej)
    let distributionData;
    if (mean < 0.1) {
        // Bardzo mało przesiadek
        distributionData = [
            { range: '0 przesiadek', value: 90, label: 'Podróże bezpośrednie (0 przesiadek)' },
            { range: '1 przesiadka', value: 8, label: 'Jedna przesiadka' },
            { range: '2 przesiadki', value: 2, label: 'Dwie przesiadki' },
            { range: '3+ przesiadek', value: 0, label: 'Trzy lub więcej przesiadek' }
        ];
    } else if (mean < 0.3) {
        // Mało przesiadek
        distributionData = [
            { range: '0 przesiadek', value: 75, label: 'Podróże bezpośrednie (0 przesiadek)' },
            { range: '1 przesiadka', value: 20, label: 'Jedna przesiadka' },
            { range: '2 przesiadki', value: 4, label: 'Dwie przesiadki' },
            { range: '3+ przesiadek', value: 1, label: 'Trzy lub więcej przesiadek' }
        ];
    } else if (mean < 0.5) {
        // Średnio przesiadek
        distributionData = [
            { range: '0 przesiadek', value: 60, label: 'Podróże bezpośrednie (0 przesiadek)' },
            { range: '1 przesiadka', value: 30, label: 'Jedna przesiadka' },
            { range: '2 przesiadki', value: 8, label: 'Dwie przesiadki' },
            { range: '3+ przesiadek', value: 2, label: 'Trzy lub więcej przesiadek' }
        ];
    } else {
        // Dużo przesiadek
        distributionData = [
            { range: '0 przesiadek', value: 50, label: 'Podróże bezpośrednie (0 przesiadek)' },
            { range: '1 przesiadka', value: 35, label: 'Jedna przesiadka' },
            { range: '2 przesiadki', value: 12, label: 'Dwie przesiadki' },
            { range: '3+ przesiadek', value: 3, label: 'Trzy lub więcej przesiadek' }
        ];
    }
    
    // Stwórz nowy wykres
    window.transfersDistributionChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: distributionData.map(d => d.range),
            datasets: [{
                label: 'Procent tras',
                data: distributionData.map(d => d.value),
                backgroundColor: 'rgba(123, 104, 238, 0.7)', // Fioletowy dla przesiadek
                borderColor: 'rgba(123, 104, 238, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Rozkład liczby przesiadek - ${regionData.city_name}`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const dataIndex = context.dataIndex;
                            const binRange = distributionData[dataIndex].label;
                            const percentage = context.parsed.y;
                            const estimatedTrails = Math.round((percentage / 100) * regionData.metrics.liczba_tras);
                            
                            return [
                                `${binRange}: ${percentage.toFixed(1)}%`,
                                `~${estimatedTrails.toLocaleString('pl-PL')} tras w tym przedziale`
                            ];
                        },
                        afterBody: function(context) {
                            return [
                                '',
                                `Region: ${regionData.city_name}`,
                                `Pozycja w rankingu: ${regionData.rank}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Liczba przesiadek'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Procent tras (%)'
                    },
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function renderNajpunktualniejCharts() {
    const chart1 = document.getElementById('chart1');
    const chart2 = document.getElementById('chart2');
    
    // Wykres 1 - Średnie opóźnienie według regionów
    chart1.innerHTML = `<canvas id="chart1-canvas" width="400" height="200"></canvas>`;
    const sortedData = currentData.data.sort((a, b) => a.primary_value - b.primary_value);
    const labels = sortedData.map(item => item.city_name);
    const meanValues = sortedData.map(item => item.metrics.mean);
    const medianValues = sortedData.map(item => item.metrics.median);
    const colors = generateGradientColors(sortedData.length);
    const ctx1 = document.getElementById('chart1-canvas').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Średnie opóźnienie (min)',
                data: meanValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }, {
                label: 'Mediana (min)',
                data: medianValues,
                type: 'line',
                fill: false,
                borderColor: '#2c3e50',
                backgroundColor: '#2c3e50',
                pointBackgroundColor: '#2c3e50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Średnie opóźnienie według regionów',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { display: true, position: 'top' },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        afterBody: function(context) {
                            const dataIndex = context[0].dataIndex;
                            const item = sortedData[dataIndex];
                            return [
                                `Pozycja w rankingu: ${item.rank}`,
                                `Populacja: ${item.population ? item.population.toLocaleString('pl-PL') : '-'}`,
                                `Liczba rekordów: ${item.metrics.n_records ? item.metrics.n_records.toLocaleString('pl-PL') : '-'}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: { display: true, title: { display: true, text: 'Regiony' }, ticks: { maxRotation: 45, minRotation: 45 } },
                y: { display: true, title: { display: true, text: 'Opóźnienie (minuty)' }, beginAtZero: true }
            },
            interaction: { mode: 'index', intersect: false }
        }
    });

    // Wykres 2 został usunięty - wskaźnik najpunktualniej ma tylko Wykres 1
    chart2.innerHTML = `<p class="chart-placeholder">Wykres 2 został usunięty dla wskaźnika "najpunktualniej"</p>`;
}



function renderNajszybciejCharts() {
    const chart1 = document.getElementById('chart1');
    const chart2 = document.getElementById('chart2');
    
    // Wykres 1 - Średnia prędkość ważona według regionów
    chart1.innerHTML = `<canvas id="chart1-canvas" width="400" height="200"></canvas>`;
    const sortedData = currentData.data.sort((a, b) => b.primary_value - a.primary_value); // sortowanie malejąco
    const labels = sortedData.map(item => item.city_name);
    const meanValues = sortedData.map(item => item.metrics.avg_speed_weighted);
    const medianValues = sortedData.map(item => item.metrics.median_speed);
    const colors = generateGradientColors(sortedData.length);
    const ctx1 = document.getElementById('chart1-canvas').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Średnia prędkość ważona (km/h)',
                data: meanValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }, {
                label: 'Mediana prędkości (km/h)',
                data: medianValues,
                type: 'line',
                fill: false,
                borderColor: '#2c3e50',
                backgroundColor: '#2c3e50',
                pointBackgroundColor: '#2c3e50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Średnia prędkość ważona według regionów',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { display: true, position: 'top' },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        afterBody: function(context) {
                            const dataIndex = context[0].dataIndex;
                            const item = sortedData[dataIndex];
                            return [
                                `Pozycja w rankingu: ${item.rank}`,
                                `Populacja: ${item.population ? item.population.toLocaleString('pl-PL') : '-'}`,
                                `Liczba rekordów: ${item.metrics.n_records ? item.metrics.n_records.toLocaleString('pl-PL') : '-'}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: { display: true, title: { display: true, text: 'Regiony' }, ticks: { maxRotation: 45, minRotation: 45 } },
                y: { display: true, title: { display: true, text: 'Prędkość (km/h)' }, beginAtZero: true }
            },
            interaction: { mode: 'index', intersect: false }
        }
    });

    // Wykres 2 - Rozkład prędkości z dropdown
    chart2.innerHTML = `
        <div class="chart-controls">
            <label for="region-select-speed">Wybierz region:</label>
            <select id="region-select-speed" class="region-dropdown">
                <option value="">Wybierz region...</option>
                ${currentData.data.filter(item => item.region_code !== 'LONG_DISTANCE').sort((a, b) => a.city_name.localeCompare(b.city_name, 'pl-PL')).map(item => 
                    `<option value="${item.region_code}">${item.city_name}</option>`
                ).join('')}
            </select>
        </div>
        <div class="chart-canvas-container">
            <canvas id="chart2-canvas" width="400" height="200"></canvas>
        </div>
    `;
    
    // Dodaj event listener dla dropdown
    const regionSelect = document.getElementById('region-select-speed');
    regionSelect.addEventListener('change', function() {
        const selectedRegion = this.value;
        if (selectedRegion) {
            updateSpeedDistributionChart(selectedRegion);
        }
    });
    
    // Inicjalnie wybierz pierwszy region (pomijając LONG_DISTANCE)
    const regularRegions = currentData.data.filter(item => item.region_code !== 'LONG_DISTANCE');
    if (regularRegions.length > 0) {
        regionSelect.value = regularRegions[0].region_code;
        updateSpeedDistributionChart(regularRegions[0].region_code);
    }
}

// Funkcja aktualizacji wykresu rozkładu prędkości
function updateSpeedDistributionChart(regionCode) {
    const regionData = currentData.data.find(item => item.region_code === regionCode);
    if (!regionData) return;
    
    const ctx2 = document.getElementById('chart2-canvas').getContext('2d');
    
    // Zniszcz poprzedni wykres jeśli istnieje
    if (window.speedDistributionChart) {
        window.speedDistributionChart.destroy();
    }
    
    // STAŁE JEDNOLITE PRZEDZIAŁY PRĘDKOŚCI dla wszystkich regionów
    const uniformBins = [
        { range: '0-10 km/h', min: 0, max: 10 },
        { range: '10-15 km/h', min: 10, max: 15 },
        { range: '15-20 km/h', min: 15, max: 20 },
        { range: '20-25 km/h', min: 20, max: 25 },
        { range: '25-30 km/h', min: 25, max: 30 },
        { range: '30-35 km/h', min: 30, max: 35 },
        { range: '35-40 km/h', min: 35, max: 40 },
        { range: '40-50 km/h', min: 40, max: 50 },
        { range: '50-60 km/h', min: 50, max: 60 },
        { range: '60+ km/h', min: 60, max: Infinity }
    ];
    
    // Oszacuj rozkład na podstawie percentyli regionu
    const percentiles = regionData.percentiles;
    const distributionValues = estimateDistributionFromPercentiles(percentiles, uniformBins);
    
    // Stwórz nowy wykres
    window.speedDistributionChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: uniformBins.map(bin => bin.range),
            datasets: [{
                label: 'Procent połączeń',
                data: distributionValues,
                backgroundColor: 'rgba(255, 140, 0, 0.7)', // Pomarańczowy dla prędkości
                borderColor: 'rgba(255, 140, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Rozkład prędkości - ${regionData.city_name}`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const dataIndex = context.dataIndex;
                            return adjustedData[dataIndex].label + ': ' + context.parsed.y + '%';
                        },
                        afterBody: function(context) {
                            return [
                                `Średnia prędkość ważona: ${regionData.metrics.avg_speed_weighted.toFixed(2)} km/h`,
                                `Średnia prędkość: ${regionData.metrics.mean_speed.toFixed(2)} km/h`,
                                `Mediana: ${regionData.metrics.median_speed.toFixed(1)} km/h`,
                                `Liczba rekordów: ${regionData.metrics.n_records.toLocaleString('pl-PL')}`,
                                `Pozycja w rankingu: ${regionData.rank}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Zakres prędkości'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Procent połączeń (%)'
                    },
                    beginAtZero: true,
                    max: 60
                }
            }
        }
    });
}

function renderNajtaniejCharts() {
    const chart1 = document.getElementById('chart1');
    const chart2 = document.getElementById('chart2');
    
    // Wykres 1 - Średni koszt za kilometr według regionów
    chart1.innerHTML = `<canvas id="chart1-canvas" width="400" height="200"></canvas>`;
    const sortedData = currentData.data.sort((a, b) => a.primary_value - b.primary_value);
    const labels = sortedData.map(item => item.city_name);
    const meanValues = sortedData.map(item => item.metrics.weighted_avg_cost_per_km);
    const medianValues = sortedData.map(item => null); // brak mediany w danych
    const colors = generateGradientColors(sortedData.length);
    const ctx1 = document.getElementById('chart1-canvas').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Średni koszt za km (PLN)',
                data: meanValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Średni koszt za kilometr według regionów',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { display: true, position: 'top' },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        afterBody: function(context) {
                            const dataIndex = context[0].dataIndex;
                            const item = sortedData[dataIndex];
                            return [
                                `Pozycja w rankingu: ${item.rank}`,
                                `Populacja: ${item.population ? item.population.toLocaleString('pl-PL') : '-'}`,
                                `Liczba rekordów: ${item.metrics.records ? item.metrics.records.toLocaleString('pl-PL') : '-'}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: { display: true, title: { display: true, text: 'Regiony' }, ticks: { maxRotation: 45, minRotation: 45 } },
                y: { display: true, title: { display: true, text: 'Koszt (PLN/km)' }, beginAtZero: true }
            },
            interaction: { mode: 'index', intersect: false }
        }
    });

    // Wykres 2 - Porównanie kosztów i dystansów
    chart2.innerHTML = `
        <div class="chart-controls">
            <p style="margin: 10px 0; font-style: italic; color: #666; font-family: 'Inter', sans-serif; font-weight: 400;">
                Dane dostępne tylko dla ${currentData.data.length} regionów z informacjami o kosztach
            </p>
        </div>
        <div class="chart-canvas-container">
            <canvas id="chart2-canvas" width="400" height="200"></canvas>
        </div>
    `;
    
    updateCostAnalysisChart();
}

// Funkcja aktualizacji wykresu analizy kosztów
function updateCostAnalysisChart() {
    const ctx2 = document.getElementById('chart2-canvas').getContext('2d');
    
    // Zniszcz poprzedni wykres jeśli istnieje
    if (window.costAnalysisChart) {
        window.costAnalysisChart.destroy();
    }
    
    // Przygotuj dane dla wykresu scatter pokazującego relację koszt vs dystans
    const scatterData = currentData.data.filter(item => item.region_code !== 'LONG_DISTANCE').map(item => ({
        x: item.metrics.total_km,
        y: item.metrics.weighted_avg_cost_per_km,
        label: item.city_name,
        totalCost: item.metrics.total_price_pln,
        records: item.metrics.records
    }));
    
    // Stwórz nowy wykres
    window.costAnalysisChart = new Chart(ctx2, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Koszt za km vs Całkowity dystans',
                data: scatterData,
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 2,
                pointRadius: 8,
                pointHoverRadius: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Analiza kosztów - Koszt za km vs Całkowity dystans',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            const point = context[0];
                            return scatterData[point.dataIndex].label;
                        },
                        label: function(context) {
                            const point = scatterData[context.dataIndex];
                            return [
                                `Koszt za km: ${point.y.toFixed(3)} PLN/km`,
                                `Całkowity dystans: ${point.x.toFixed(1)} km`,
                                `Całkowity koszt: ${point.totalCost.toFixed(2)} PLN`,
                                `Liczba rekordów: ${point.records}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Całkowity dystans (km)'
                    },
                    beginAtZero: true
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Koszt za kilometr (PLN/km)'
                    },
                    beginAtZero: true
                }
            },
            interaction: {
                intersect: false
            }
        }
    });
}

// Funkcja renderowania wykresów dla wskaźnika najczęściej nocne
function renderNajczescieiNocneCharts() {
    const chart1 = document.getElementById('chart1');
    const chart2 = document.getElementById('chart2');
    
    // Wykres 1 - Średnie czasy oczekiwania według regionów (nocne)
    chart1.innerHTML = `
        <canvas id="chart1-canvas" width="400" height="200"></canvas>
    `;
    
    // Przygotuj dane dla wykresu
    const sortedData = currentData.data.sort((a, b) => a.primary_value - b.primary_value);
    const labels = sortedData.map(item => item.city_name);
    const meanValues = sortedData.map(item => item.metrics.mean);
    const medianValues = sortedData.map(item => item.metrics.median);
    
    // Generuj kolory od zielonego do czerwonego
    const colors = generateGradientColors(sortedData.length);
    
    // Stwórz wykres
    const ctx1 = document.getElementById('chart1-canvas').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Średni czas oczekiwania nocny (min)',
                data: meanValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }, {
                label: 'Mediana (min)',
                data: medianValues,
                type: 'line',
                fill: false,
                borderColor: '#2c3e50',
                backgroundColor: '#2c3e50',
                pointBackgroundColor: '#2c3e50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Średnie czasy oczekiwania w godzinach nocnych (22:00-6:00)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        afterBody: function(context) {
                            const dataIndex = context[0].dataIndex;
                            const item = sortedData[dataIndex];
                            return [
                                `Pozycja w rankingu: ${item.rank}`,
                                `Populacja: ${item.population.toLocaleString('pl-PL')}`,
                                `Liczba tras: ${item.metrics.n_records.toLocaleString('pl-PL')}`,
                                `Różnica średnia-mediana: ${(item.metrics.mean - item.metrics.median).toFixed(2)} min`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Regiony'
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Czas oczekiwania (minuty)'
                    },
                    beginAtZero: true
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
    
    // Wykres 2 - Rozkład czasów oczekiwania z dropdown (nocne)
    chart2.innerHTML = `
        <div class="chart-controls">
            <label for="region-select-nocne">Wybierz region:</label>
            <select id="region-select-nocne" class="region-dropdown">
                <option value="">Wybierz region...</option>
                ${currentData.data.sort((a, b) => a.city_name.localeCompare(b.city_name, 'pl-PL')).map(item => 
                    `<option value="${item.region_code}">${item.city_name}</option>`
                ).join('')}
            </select>
        </div>
        <div class="chart-canvas-container">
            <canvas id="chart2-canvas" width="400" height="200"></canvas>
        </div>
    `;
    
    // Dodaj event listener dla dropdown
    const regionSelect = document.getElementById('region-select-nocne');
    regionSelect.addEventListener('change', function() {
        const selectedRegion = this.value;
        if (selectedRegion) {
            updateWaitTimeDistributionNocneChart(selectedRegion);
        }
    });
    
    // Inicjalnie wybierz pierwszy region
    if (currentData.data.length > 0) {
        regionSelect.value = currentData.data[0].region_code;
        updateWaitTimeDistributionNocneChart(currentData.data[0].region_code);
    }
}

// Funkcja aktualizacji wykresu rozkładu czasów oczekiwania nocnych
function updateWaitTimeDistributionNocneChart(regionCode) {
    const regionData = currentData.data.find(item => item.region_code === regionCode);
    if (!regionData) return;
    
    const ctx2 = document.getElementById('chart2-canvas').getContext('2d');
    
    // Zniszcz poprzedni wykres jeśli istnieje
    if (window.waitTimeDistributionNocneChart) {
        window.waitTimeDistributionNocneChart.destroy();
    }
    
    // STAŁE JEDNOLITE PRZEDZIAŁY CZASOWE dla wskaźników nocnych (szerszy zakres)
    const uniformBins = [
        { range: '0-2 min', min: 0, max: 2 },
        { range: '2-4 min', min: 2, max: 4 },
        { range: '4-6 min', min: 4, max: 6 },
        { range: '6-8 min', min: 6, max: 8 },
        { range: '8-10 min', min: 8, max: 10 },
        { range: '10-15 min', min: 10, max: 15 },
        { range: '15-20 min', min: 15, max: 20 },
        { range: '20-30 min', min: 20, max: 30 },
        { range: '30-45 min', min: 30, max: 45 },
        { range: '45-60 min', min: 45, max: 60 },
        { range: '60+ min', min: 60, max: Infinity }
    ];
    
    // Oszacuj rozkład na podstawie percentyli regionu
    const percentiles = regionData.percentiles;
    const distributionValues = estimateDistributionFromPercentiles(percentiles, uniformBins);
    
    // Stwórz nowy wykres
    window.waitTimeDistributionNocneChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: uniformBins.map(bin => bin.range),
            datasets: [{
                label: 'Procent wyszukań',
                data: distributionValues,
                backgroundColor: 'rgba(75, 0, 130, 0.7)', // Fioletowy dla nocnych
                borderColor: 'rgba(75, 0, 130, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Rozkład czasów oczekiwania nocnych - ${regionData.city_name}`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const binIndex = context.dataIndex;
                            const binRange = uniformBins[binIndex].range;
                            return `${binRange}: ${context.parsed.y.toFixed(1)}%`;
                        },
                        afterBody: function(context) {
                            return [
                                `Średni czas: ${regionData.metrics.mean.toFixed(2)} min`,
                                `Mediana: ${regionData.metrics.median.toFixed(1)} min`,
                                `Liczba tras: ${regionData.metrics.n_records.toLocaleString('pl-PL')}`,
                                `Pozycja w rankingu: ${regionData.rank}`,
                                `Różnica średnia-mediana: ${(regionData.metrics.mean - regionData.metrics.median).toFixed(2)} min`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Zakres czasów oczekiwania nocnych'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Procent wyszukań (%)'
                    },
                    beginAtZero: true,
                    max: 50
                }
            }
        }
    });
}

// Funkcja renderowania wykresów dla wskaźnika najmniej czekania nocne
function renderNajmniejCzekaniaNocneCharts() {
    const chart1 = document.getElementById('chart1');
    const chart2 = document.getElementById('chart2');
    
    // Wykres 1 - Średni czas czekania na odjazd według regionów (nocne)
    chart1.innerHTML = `<canvas id="chart1-canvas" width="400" height="200"></canvas>`;
    const sortedData = currentData.data.sort((a, b) => a.primary_value - b.primary_value);
    const labels = sortedData.map(item => item.city_name);
    const meanValues = sortedData.map(item => item.metrics.mean);
    const medianValues = sortedData.map(item => item.metrics.median);
    const colors = generateGradientColors(sortedData.length);
    const ctx1 = document.getElementById('chart1-canvas').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Średni czas czekania na odjazd nocny (min)',
                data: meanValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace('0.8', '1')),
                borderWidth: 1
            }, {
                label: 'Mediana (min)',
                data: medianValues,
                type: 'line',
                fill: false,
                borderColor: '#2c3e50',
                backgroundColor: '#2c3e50',
                pointBackgroundColor: '#2c3e50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Średni czas czekania na odjazd w godzinach nocnych (22:00-6:00)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { display: true, position: 'top' },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        afterBody: function(context) {
                            const dataIndex = context[0].dataIndex;
                            const item = sortedData[dataIndex];
                            return [
                                `Pozycja w rankingu: ${item.rank}`,
                                `Populacja: ${item.population ? item.population.toLocaleString('pl-PL') : '-'}`,
                                `Liczba próbek: ${item.metrics.n_samples ? item.metrics.n_samples.toLocaleString('pl-PL') : '-'}`,
                                `Różnica średnia-mediana: ${(item.metrics.mean - item.metrics.median).toFixed(2)} min`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: { display: true, title: { display: true, text: 'Regiony' }, ticks: { maxRotation: 45, minRotation: 45 } },
                y: { display: true, title: { display: true, text: 'Czas czekania na odjazd (minuty)' }, beginAtZero: true }
            },
            interaction: { mode: 'index', intersect: false }
        }
    });

    // Wykres 2 - Rozkład czasów oczekiwania na odjazd z dropdown (nocne)
    chart2.innerHTML = `
        <div class="chart-controls">
            <label for="region-select-departure-nocne">Wybierz region:</label>
            <select id="region-select-departure-nocne" class="region-dropdown">
                <option value="">Wybierz region...</option>
                ${currentData.data.filter(item => item.region_code !== 'LONG_DISTANCE').sort((a, b) => a.city_name.localeCompare(b.city_name, 'pl-PL')).map(item => 
                    `<option value="${item.region_code}">${item.city_name}</option>`
                ).join('')}
            </select>
        </div>
        <div class="chart-canvas-container">
            <canvas id="chart2-canvas" width="400" height="200"></canvas>
        </div>
    `;
    
    // Dodaj event listener dla dropdown
    const regionSelect = document.getElementById('region-select-departure-nocne');
    regionSelect.addEventListener('change', function() {
        const selectedRegion = this.value;
        if (selectedRegion) {
            updateDepartureWaitDistributionNocneChart(selectedRegion);
        }
    });
    
    // Inicjalnie wybierz pierwszy region (pomijając LONG_DISTANCE)
    const regularRegions = currentData.data.filter(item => item.region_code !== 'LONG_DISTANCE');
    if (regularRegions.length > 0) {
        regionSelect.value = regularRegions[0].region_code;
        updateDepartureWaitDistributionNocneChart(regularRegions[0].region_code);
    }
}

// Funkcja aktualizacji wykresu rozkładu czasów oczekiwania na odjazd nocne
function updateDepartureWaitDistributionNocneChart(regionCode) {
    const regionData = currentData.data.find(item => item.region_code === regionCode);
    if (!regionData) return;
    
    const ctx2 = document.getElementById('chart2-canvas').getContext('2d');
    
    // Zniszcz poprzedni wykres jeśli istnieje
    if (window.departureWaitDistributionNocneChart) {
        window.departureWaitDistributionNocneChart.destroy();
    }
    
    // STAŁE JEDNOLITE PRZEDZIAŁY CZASOWE dla czekania nocnego (szerszy zakres)
    const uniformBins = [
        { range: '0-2 min', min: 0, max: 2 },
        { range: '2-4 min', min: 2, max: 4 },
        { range: '4-6 min', min: 4, max: 6 },
        { range: '6-8 min', min: 6, max: 8 },
        { range: '8-10 min', min: 8, max: 10 },
        { range: '10-15 min', min: 10, max: 15 },
        { range: '15-20 min', min: 15, max: 20 },
        { range: '20-30 min', min: 20, max: 30 },
        { range: '30-45 min', min: 30, max: 45 },
        { range: '45-60 min', min: 45, max: 60 },
        { range: '60-90 min', min: 60, max: 90 },
        { range: '90+ min', min: 90, max: Infinity }
    ];
    
    // Oszacuj rozkład na podstawie percentyli regionu
    const percentiles = regionData.percentiles;
    const distributionValues = estimateDistributionFromPercentiles(percentiles, uniformBins);
    
    // Stwórz nowy wykres
    window.departureWaitDistributionNocneChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: uniformBins.map(bin => bin.range),
            datasets: [{
                label: 'Procent wyszukań',
                data: distributionValues,
                backgroundColor: 'rgba(139, 69, 19, 0.7)', // Brązowy dla czekania nocnego
                borderColor: 'rgba(139, 69, 19, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Rozkład czasów czekania na odjazd (nocne) - ${regionData.city_name}`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const binIndex = context.dataIndex;
                            const binRange = uniformBins[binIndex].range;
                            return `${binRange}: ${context.parsed.y.toFixed(1)}%`;
                        },
                        afterBody: function(context) {
                            return [
                                `Średni czas: ${regionData.metrics.mean.toFixed(2)} min`,
                                `Mediana: ${regionData.metrics.median.toFixed(1)} min`,
                                `Liczba próbek: ${regionData.metrics.n_samples.toLocaleString('pl-PL')}`,
                                `Pozycja w rankingu: ${regionData.rank}`,
                                `Różnica średnia-mediana: ${(regionData.metrics.mean - regionData.metrics.median).toFixed(2)} min`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Zakres czasów czekania na odjazd (nocne)'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Procent wyszukań (%)'
                    },
                    beginAtZero: true,
                    max: 50
                }
            }
        }
    });
}

// Funkcja generująca kolory gradientowe od zielonego do czerwonego
function generateGradientColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const ratio = i / (count - 1);
        const red = Math.round(255 * ratio);
        const green = Math.round(255 * (1 - ratio));
        const blue = 50;
        colors.push(`rgba(${red}, ${green}, ${blue}, 0.8)`);
    }
    return colors;
}

// Funkcja renderowania tabeli
function renderTable() {
    const tableWrapper = document.getElementById('table-wrapper');
    
    if (currentData && (currentIndicator === 'najczesciej' || 
        currentIndicator === 'najmniej_chodzenia' || 
        currentIndicator === 'najmniej_czekania' || 
        currentIndicator === 'najmniej_przesiadek' || 
        currentIndicator === 'najpunktualniej' || 
        currentIndicator === 'najszybciej_v2' || 
        currentIndicator === 'najtaniej' ||
        currentIndicator === 'najczesciej_nocne' ||
        currentIndicator === 'najmniej_czekania_nocne')) {
        // Dla wskaźników ze szczegółową tabelą ukrywamy całą sekcję tabeli i pokazujemy tylko szczegółową
        const tableSection = document.querySelector('.table-section');
        if (tableSection) tableSection.style.display = 'none';
        renderDetailedTable(); // Dodaj szczegółową tabelę
    } else if (currentData && currentData.tableData && currentData.tableData.length > 0) {
        // Przywróć widoczność sekcji podstawowej tabeli
        const tableSection = document.querySelector('.table-section');
        if (tableSection) tableSection.style.display = 'block';
        
        const data = currentData.tableData;
        const headers = Object.keys(data[0]);
        
        const tableHTML = `
            <table>
                <thead>
                    <tr>
                        ${headers.map(header => `<th>${header}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => 
                        `<tr>
                            ${headers.map(header => `<td>${formatCellValue(row[header])}</td>`).join('')}
                        </tr>`
                    ).join('')}
                </tbody>
            </table>
        `;
        
        tableWrapper.innerHTML = tableHTML;
    } else {
        // Przywróć widoczność sekcji podstawowej tabeli
        const tableSection = document.querySelector('.table-section');
        if (tableSection) tableSection.style.display = 'block';
        
        tableWrapper.innerHTML = '<p>Brak danych do wyświetlenia w tabeli</p>';
    }
}

// Zmienne dla szczegółowej tabeli
let detailedTableData = [];
let currentSortColumn = null;
let currentSortDirection = 'asc';

// Konfiguracje mapowania kolumn dla różnych wskaźników
const columnMappings = {
    najczesciej: {
        region: 'city_name',
        population: 'population', 
        liczba_tras: 'metrics.n_records',
        srednia: 'metrics.mean_no_outliers',
        mediana: 'metrics.median',
        odchylenie_std: 'metrics.std',
        minimum: 'percentiles.p25',
        maksimum: 'percentiles.p95',
        hasMinMax: true,
        unit: 'min',
        note: '* Minimum i maksimum to przybliżone wartości oparte na percentylach (25% i 95%). Wszystkie dane uwzględniają wartości bez outlierów.'
    },
    
    najmniej_chodzenia: {
        region: 'city_name',
        population: 'population',
        liczba_tras: 'metrics.liczba_tras',
        srednia: 'metrics.srednia_chodzenie_m',
        mediana: 'metrics.mediana_chodzenie_m',
        odchylenie_std: 'metrics.odchylenie_std',
        minimum: 'metrics.min_chodzenie_m',
        maksimum: 'metrics.max_chodzenie_m',
        hasMinMax: true,
        unit: 'm',
        note: 'Minimum i maksimum to rzeczywiste wartości z danych. Wszystkie odległości w metrach reprezentują łączną długość tras pieszych w podróży.'
    },
    
    najmniej_czekania: {
        region: 'city_name',
        population: 'population',
        liczba_tras: 'metrics.n_samples',
        srednia: 'metrics.mean_no_outliers_mad',
        mediana: 'metrics.median',
        odchylenie_std: 'metrics.std',
        minimum: 'percentiles.p25',
        maksimum: 'percentiles.p95',
        hasMinMax: true,
        unit: 'min',
        note: '* Minimum i maksimum to przybliżone wartości oparte na percentylach (25% i 95%). Średnia uwzględnia dane bez outlierów (metoda MAD).'
    },
    
    najmniej_przesiadek: {
        region: 'city_name',
        population: 'population',
        liczba_tras: 'metrics.liczba_tras',
        srednia: 'metrics.srednia',
        mediana: 'metrics.mediana',
        odchylenie_std: 'metrics.std',
        minimum: null,
        maksimum: null,
        hasMinMax: false,
        unit: '',
        note: 'Dane przedstawiają średnią liczbę przesiadek na trasę. Większość tras to podróże bezpośrednie (mediana = 0).'
    },
    
    najpunktualniej: {
        region: 'city_name',
        population: 'population',
        liczba_tras: 'metrics.n_records',
        srednia: 'metrics.mean_no_outliers',
        mediana: 'metrics.median',
        odchylenie_std: 'metrics.std',
        minimum: 'percentiles.p25',
        maksimum: 'percentiles.p95',
        hasMinMax: true,
        unit: 'min',
        note: '* Minimum i maksimum to przybliżone wartości oparte na percentylach (25% i 95%). UWAGA: Dane dostępne tylko dla 6 regionów.'
    },
    
    najszybciej_v2: {
        region: 'city_name',
        population: 'population',
        liczba_tras: 'metrics.n_records',
        srednia: 'metrics.avg_speed_weighted',
        mediana: 'metrics.median_speed',
        odchylenie_std: 'metrics.std_speed',
        minimum: 'percentiles.p25',
        maksimum: 'percentiles.p95',
        hasMinMax: true,
        unit: 'km/h',
        note: '* Minimum i maksimum to przybliżone wartości oparte na percentylach (25% i 95%). Analiza wyklucza pociągi z obliczeń prędkości.'
    },
    
    najtaniej: {
        region: 'city_name',
        population: 'population',
        liczba_tras: 'metrics.records',
        srednia: 'metrics.weighted_avg_cost_per_km',
        mediana: null,
        odchylenie_std: null,
        minimum: null,
        maksimum: null,
        hasMinMax: false,
        unit: 'PLN/km',
        note: 'UWAGA: Dane kosztowe dostępne tylko dla 5 regionów. Brak danych o medianie i odchyleniu standardowym.'
    },
    
    najczesciej_nocne: {
        region: 'city_name',
        population: 'population', 
        liczba_tras: 'metrics.n_records',
        srednia: 'metrics.mean_no_outliers',
        mediana: 'metrics.median',
        odchylenie_std: 'metrics.std',
        minimum: 'percentiles.p25',
        maksimum: 'percentiles.p95',
        hasMinMax: true,
        unit: 'min',
        note: '* Minimum i maksimum to przybliżone wartości oparte na percentylach (25% i 95%). Analiza dla godzin nocnych (22:00-6:00) w dni robocze. Znacznie większa zmienność niż w godzinach dziennych.'
    },
    
    najmniej_czekania_nocne: {
        region: 'city_name',
        population: 'population',
        liczba_tras: 'metrics.n_samples',
        srednia: 'metrics.mean_no_outliers_mad',
        mediana: 'metrics.median',
        odchylenie_std: 'metrics.std',
        minimum: 'percentiles.p10',
        maksimum: 'percentiles.p95',
        hasMinMax: true,
        unit: 'min',
        note: '* Minimum i maksimum to przybliżone wartości oparte na percentylach (10% i 95%). Analiza dla godzin nocnych (22:00-6:00). Identyczna mediana jak w dzień (5.0 min), ale dwukrotnie wyższa średnia.'
    }
};

// Funkcja pomocnicza do pobrania wartości z zagnieżdżonej ścieżki
function getNestedValue(obj, path) {
    if (!path) return null;
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Funkcja renderowania szczegółowej tabeli
function renderDetailedTable() {
    const detailedSection = document.getElementById('detailed-table-section');
    const detailedWrapper = document.getElementById('detailed-table-wrapper');
    
    if (currentIndicator === 'najczesciej' || 
        currentIndicator === 'najmniej_chodzenia' || 
        currentIndicator === 'najmniej_czekania' || 
        currentIndicator === 'najmniej_przesiadek' || 
        currentIndicator === 'najpunktualniej' || 
        currentIndicator === 'najszybciej_v2' || 
        currentIndicator === 'najtaniej' ||
        currentIndicator === 'najczesciej_nocne' ||
        currentIndicator === 'najmniej_czekania_nocne') {
        detailedSection.style.display = 'block';
        
        // Pobierz mapowanie dla aktualnego wskaźnika
        const mapping = columnMappings[currentIndicator];
        if (!mapping) {
            console.error('Brak mapowania dla wskaźnika:', currentIndicator);
            return;
        }
        
        // Przygotuj dane z mapowaniem kolumn
        detailedTableData = currentData.data.map(item => {
            const mappedItem = {
                region: getNestedValue(item, mapping.region),
                population: getNestedValue(item, mapping.population),
                liczba_tras: getNestedValue(item, mapping.liczba_tras),
                srednia: getNestedValue(item, mapping.srednia),
                mediana: getNestedValue(item, mapping.mediana),
                odchylenie_std: getNestedValue(item, mapping.odchylenie_std),
                rank: item.rank,
                region_code: item.region_code
            };
            
            // Dodaj min/max jeśli dostępne
            if (mapping.hasMinMax && mapping.minimum && mapping.maksimum) {
                mappedItem.minimum = getNestedValue(item, mapping.minimum);
                mappedItem.maksimum = getNestedValue(item, mapping.maksimum);
            }
            
            return mappedItem;
        });
        
        // Dodaj event listener dla filtra populacji
        const populationFilter = document.getElementById('population-filter');
        populationFilter.removeEventListener('change', filterDetailedTable); // Usuń poprzedni
        populationFilter.addEventListener('change', filterDetailedTable);
        
        // Renderuj tabelę
        renderDetailedTableContent();
    } else {
        detailedSection.style.display = 'none';
    }
}

// Funkcja filtrowania szczegółowej tabeli
function filterDetailedTable() {
    const filterValue = document.getElementById('population-filter').value;
    let filteredData = [...detailedTableData];
    
    if (filterValue !== 'all') {
        switch (filterValue) {
            case '0-100000':
                filteredData = filteredData.filter(item => item.population < 100000);
                break;
            case '100000-300000':
                filteredData = filteredData.filter(item => item.population >= 100000 && item.population < 300000);
                break;
            case '300000-500000':
                filteredData = filteredData.filter(item => item.population >= 300000 && item.population < 500000);
                break;
            case '500000-700000':
                filteredData = filteredData.filter(item => item.population >= 500000 && item.population < 700000);
                break;
            case '700000+':
                filteredData = filteredData.filter(item => item.population >= 700000);
                break;
        }
    }
    
    renderDetailedTableContent(filteredData);
}

// Funkcja renderowania zawartości szczegółowej tabeli
function renderDetailedTableContent(data = detailedTableData) {
    const detailedWrapper = document.getElementById('detailed-table-wrapper');
    const filterValue = document.getElementById('population-filter').value;
    
    // Pobierz mapowanie dla aktualnego wskaźnika
    const mapping = columnMappings[currentIndicator];
    const unit = mapping ? mapping.unit : '';
    const hasMinMax = mapping ? mapping.hasMinMax : false;
    const note = mapping ? mapping.note : '';
    
    // Sortuj dane jeśli jest ustawione sortowanie
    if (currentSortColumn) {
        data = [...data].sort((a, b) => {
            let valueA = a[currentSortColumn];
            let valueB = b[currentSortColumn];
            
            // Obsługa różnych typów danych
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
            
            if (currentSortDirection === 'asc') {
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            } else {
                return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
            }
        });
    }
    
    // Info o filtrze
    let filterInfo = '';
    if (filterValue !== 'all') {
        const filterLabels = {
            '0-100000': '0 - 100 000 mieszkańców',
            '100000-300000': '100 000 - 300 000 mieszkańców',
            '300000-500000': '300 000 - 500 000 mieszkańców',
            '500000-700000': '500 000 - 700 000 mieszkańców',
            '700000+': 'Powyżej 700 000 mieszkańców'
        };
        filterInfo = `<div class="filter-info">Wyświetlane regiony: ${filterLabels[filterValue]} (${data.length} z ${detailedTableData.length})</div>`;
    }
    
    const tableHTML = `
        ${filterInfo}
        <table class="sortable-table">
            <thead>
                <tr>
                    <th data-column="region" class="${currentSortColumn === 'region' ? 'sort-' + currentSortDirection : ''}">Region</th>
                    <th data-column="population" class="${currentSortColumn === 'population' ? 'sort-' + currentSortDirection : ''}">Populacja</th>
                    <th data-column="liczba_tras" class="${currentSortColumn === 'liczba_tras' ? 'sort-' + currentSortDirection : ''}">Liczba tras</th>
                    <th data-column="srednia" class="${currentSortColumn === 'srednia' ? 'sort-' + currentSortDirection : ''}">Średnia${unit ? ' (' + unit + ')' : ''}</th>
                    <th data-column="mediana" class="${currentSortColumn === 'mediana' ? 'sort-' + currentSortDirection : ''}">Mediana${unit ? ' (' + unit + ')' : ''}</th>
                    <th data-column="odchylenie_std" class="${currentSortColumn === 'odchylenie_std' ? 'sort-' + currentSortDirection : ''}">Odchylenie std</th>
                    ${hasMinMax ? `
                    <th data-column="minimum" class="${currentSortColumn === 'minimum' ? 'sort-' + currentSortDirection : ''}">Minimum*${unit ? ' (' + unit + ')' : ''}</th>
                    <th data-column="maksimum" class="${currentSortColumn === 'maksimum' ? 'sort-' + currentSortDirection : ''}">Maksimum*${unit ? ' (' + unit + ')' : ''}</th>
                    ` : ''}
                </tr>
            </thead>
            <tbody>
                ${data.map(item => 
                    `<tr>
                        <td class="city-name">${item.region}</td>
                        <td class="number">${item.population ? item.population.toLocaleString('pl-PL') : '-'}</td>
                        <td class="number">${item.liczba_tras ? item.liczba_tras.toLocaleString('pl-PL') : '-'}</td>
                        <td class="number">${typeof item.srednia === 'number' ? item.srednia.toFixed(2) : '-'}</td>
                        <td class="number">${typeof item.mediana === 'number' ? item.mediana.toFixed(1) : '-'}</td>
                        <td class="number">${typeof item.odchylenie_std === 'number' ? item.odchylenie_std.toFixed(2) : '-'}</td>
                        ${hasMinMax ? `
                        <td class="number">${typeof item.minimum === 'number' ? item.minimum.toFixed(1) : '-'}</td>
                        <td class="number">${typeof item.maksimum === 'number' ? item.maksimum.toFixed(1) : '-'}</td>
                        ` : ''}
                    </tr>`
                ).join('')}
            </tbody>
        </table>
        ${note ? `<div style="margin-top: 1rem; font-size: 0.9rem; color: #666; font-style: italic; font-family: 'Inter', sans-serif; font-weight: 400;">${note}</div>` : ''}
    `;
    
    detailedWrapper.innerHTML = tableHTML;
    
    // Dodaj event listenery dla sortowania
    const sortableHeaders = detailedWrapper.querySelectorAll('.sortable-table th[data-column]');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            sortDetailedTable(column);
        });
    });
}

// Funkcja sortowania szczegółowej tabeli
function sortDetailedTable(column) {
    if (currentSortColumn === column) {
        // Zmień kierunek sortowania
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        // Nowa kolumna - sortuj rosnąco
        currentSortColumn = column;
        currentSortDirection = 'asc';
    }
    
    // Ponownie renderuj z aktualnym filtrem
    filterDetailedTable();
}



// Funkcja formatowania wartości w komórkach tabeli
function formatCellValue(value) {
    if (typeof value === 'number') {
        return value.toLocaleString('pl-PL', { maximumFractionDigits: 2 });
    }
    return value || '-';
}

// Funkcja czyszczenia wykresów i tabeli
function clearChartsAndTable() {
    document.getElementById('chart1').innerHTML = '<p>Wykres zostanie załadowany po wybraniu wskaźnika</p>';
    document.getElementById('chart2').innerHTML = '<p>Wykres zostanie załadowany po wybraniu wskaźnika</p>';
    document.getElementById('table-wrapper').innerHTML = '<p>Tabela zostanie załadowana po wybraniu wskaźnika</p>';
    
    // Przywróć widoczność sekcji podstawowej tabeli
    const tableSection = document.querySelector('.table-section');
    if (tableSection) {
        tableSection.style.display = 'block';
    }
    
    // Ukryj szczegółową tabelę
    const detailedSection = document.getElementById('detailed-table-section');
    if (detailedSection) {
        detailedSection.style.display = 'none';
    }
    
    // Zresetuj zmienne sortowania
    currentSortColumn = null;
    currentSortDirection = 'asc';
    detailedTableData = [];
}

// Funkcje pomocnicze dla stanów ładowania
function showLoading() {
    document.getElementById('chart1').classList.add('loading');
    document.getElementById('chart2').classList.add('loading');
    document.getElementById('table-wrapper').classList.add('loading');
}

function hideLoading() {
    document.getElementById('chart1').classList.remove('loading');
    document.getElementById('chart2').classList.remove('loading');
    document.getElementById('table-wrapper').classList.remove('loading');
}

function showError(message) {
    document.getElementById('chart1').innerHTML = `<p style="color: #e74c3c;">${message}</p>`;
    document.getElementById('chart2').innerHTML = `<p style="color: #e74c3c;">${message}</p>`;
    document.getElementById('table-wrapper').innerHTML = `<p style="color: #e74c3c;">${message}</p>`;
}

// Inicjalizacja aplikacji
document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplikacja załadowana');
    loadIndicator('home');
});

// Export dla testów (jeśli potrzeba)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        indicators,
        loadIndicator,
        formatCellValue
    };
}