# pziProjekt

Cilj ovog projekta je primjeniti sve vještine usvojene kroz labaratorijske vježbe kroz stvaranje web stranice koja imitira pogled admina na stranicu za pregled i manipulaciju događajima na nekoj lokaciji u nekom vremenu (koncert, humanitarna akcija, advent, javna izložba...).

Opis:

Svaki "event" mora imati sljedeće: naslov, naslovnu sliku, opis, lokaciju, datum početka i datum završetka.
Korisnik može stvoriti novi event.
Novi event se dodaje na stranicu ali i u localStorage tako da je i dalje prisutan na stranici nakon refresha.
Za odabir datuma se koristi custom kalendar (ne koristiti defaultne input type date kalendare). 
Treba imati mogućnost "prebacivanja/odabira" mjeseca i godine.
Treba biti prikazano koji je trenutni mjesec i godina.
Treba biti označen trenutni datum na kalendaru.
Treba biti jasno koji je range datuma odabran (start-end date) obratiti pozornost na edgecase scenarije vezane za datume (datum početka nesmije biti veći od datuma završetka, ali mogu biti isti - event koji traje samo jedan dan ...).
Lokacija eventa može biti bilo koji glavni grad, popis svih lokacija/glavnih gradova dohvatiti fetch apijom s https://raw.githubusercontent.com/samayo/country-json/refs/heads/master/src/country-by-capital-city.json.
Lokacija neka bude formatirana kao "Glavni Grad, Država".
U slučaju da ne postoji glavni grad, prikazati samo ime države.
Korisnik ima pregled svih eventova, prilikom refresha oni ne nestaju nego se učitavaju iz localStorage.
Korisnik može filtrirati eventove po lokaciji
Korisnik može brisati postojeći event.
