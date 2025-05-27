<div className="container mx-auto py-8 px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">Catálogo de Vinos</h1>
          {vinos && vinos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {vinos.map((vino: Vino, index) => (
                <Card key={vino.nombre} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                  <Link href={`/vino/${vino.nombre}`}>
                  <div className="relative h-64 bg-gray-200">
                    <Image src="/placeholder.svg?height=400&width=300" alt={vino.nombre} fill className="object-cover"/>
                    { /* para las ofertas */}
                    {/*{(vino.precio || index % 5 === 0) && ( // Ejemplo: si vino.en_oferta es true O como fallback, usa el index
                    <div className="absolute top-2 right-2 bg-secondary text-black text-xs font-bold px-2 py-1 rounded">
                      Oferta
                    </div>
                    )}*/}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                    {vino.tipo && <Wine className="h-3 w-3" />}
                    {vino.tipo && <span>{vino.tipo}</span>}
                    {vino.tipo && <span>•</span>}
                    {vino.bodega && <span>{vino.bodega}</span>}
                  </div>
                  <h3 className="font-semibold text-lg mb-1 truncate" title={vino.nombre}>
                    {vino.nombre || `Vino Desconocido ${vino.nombre}`}
                  </h3>
                  {vino.bodega && (
                    <p className="text-sm text-gray-600 mb-2">{vino.bodega}</p>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg">
                      {vino.precio ? `€${vino.precio.toFixed(2)}` : "Precio no disponible"}
                    </span>
                  </div>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <p>No hay vinos disponibles en el catálogooo.</p>
          )}
         </div>