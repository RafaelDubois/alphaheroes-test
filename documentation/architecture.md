# Choix de notre architecture

## Modèle-Vue-Contrôleur

MVC offre une approche simple et directe pour structurer une application, en divisant les responsabilités entre le modèle, la vue et le contrôleur. Cela permet une conception rapide et itérative de l'application, en se concentrant sur des fonctionnalités spécifiques à chaque composant sans avoir à gérer la complexité des services indépendants.

MVC offre également une clarté de la structure qui facilite la compréhension et la maintenance du code. Les développeurs peuvent rapidement identifier où se trouve la logique métier, où se trouve l'interface utilisateur et comment les deux interagissent entre elles. Cela peut être bénéfique pour un projet où la simplicité et la clarté sont des priorités.
Adaptabilité :

Bien que MVC soit moins modulaire qu'une architecture orientée service, il offre une grande adaptabilité pour les applications de taille modeste. Les fonctionnalités peuvent être ajoutées ou modifiées rapidement en modifiant les composants existants, sans avoir à réorganiser toute l'architecture de l'application.

## SOA

En comparaison nous aurions pu utiliser une architecture orientée service (SOA)

SOA divise l'application en services autonomes et interopérables, chacun offrant une fonctionnalité spécifique. Cela favorise la flexibilité car les services peuvent être développés, mis à jour et déployés indépendamment les uns des autres. Cela permet également l'interopérabilité avec d'autres systèmes et applications, car les services peuvent être appelés de manière transparente via des interfaces standardisées.

Les services dans une architecture SOA sont conçus pour être réutilisables dans différents contextes et applications. Cela permet de maximiser l'efficacité du développement en réutilisant des fonctionnalités existantes plutôt que de les recréer à partir de zéro. Dans le contexte de votre application, cela pourrait être avantageux si vous prévoyez de développer d'autres applications éducatives qui pourraient bénéficier des mêmes services.

Cependant, l'adoption de SOA peut introduire une certaine complexité et un surcoût initial en raison de la nécessité de gérer les interactions entre les services, la gestion des versions et la mise en place d'une infrastructure de communication robuste. Pour un projet de taille modeste comme "Alpha Heroes", cette complexité supplémentaire peut ne pas être justifiée.

## Notre choix - MVC

Pour "Alpha Heroes", où le projet est de taille modeste et ne nécessite pas une interopérabilité complexe avec d'autres systèmes, le modèle MVC nous semble le plus adapté. Il offre une approche plus simple et directe pour structurer l'application, ce qui permettra un développement rapide et efficace tout en maintenant une clarté de la structure.
